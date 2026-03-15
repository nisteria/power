// Pricing Engine - Advanced Tariff Optimization
// Real-time tariff switching and recommendation engine

import { db } from './db/index.js';
import { tariffs, customerTariffs } from './db/schema/billing.js';
import { calculateHourlyPrice, findOptimalChargingWindows, compareWithFixedTariff } from './jobs/pricing.js';
import { getCurrentPrice } from './jobs/prices.js';

interface TariffRecommendation {
  currentTariff: {
    id: string;
    name: string;
    monthlyCost: number;
  };
  recommendedTariff: {
    id: string;
    name: string;
    monthlyCost: number;
    reason: string;
  };
  savings: {
    monthly: number;
    yearly: number;
    percent: number;
  };
}

// Analyze customer's usage and recommend best tariff
export async function analyzeAndRecommendTariff(
  customerId: string
): Promise<TariffRecommendation | null> {
  
  // Get customer's current tariff
  const currentCustomerTariff = await db
    .select()
    .from(customerTariffs)
    .innerJoin(tariffs, eq(customerTariffs.tariffId, tariffs.id))
    .where(eq(customerTariffs.customerId, customerId))
    .where(eq(customerTariffs.status, 'active'))
    .limit(1);

  if (currentCustomerTariff.length === 0) {
    return null;
  }

  const current = currentCustomerTariff[0];
  const currentTariffInfo = current.tariffs;
  
  // Get all available dynamic tariffs
  const availableTariffs = await db
    .select()
    .from(tariffs)
    .where(eq(tariffs.status, 'active'))
    .where(eq(tariffs.isDynamic, true));

  // Get current EPEX price
  const currentPrice = await getCurrentPrice();
  
  // Calculate monthly cost estimates
  const monthlyKwh = 400; // Average household consumption
  
  const currentMonthlyCost = currentTariffInfo.isDynamic
    ? monthlyKwh * (currentPrice / 1000) + currentTariffInfo.basePriceMonthly
    : monthlyKwh * currentTariffInfo.energyPriceKwh + currentTariffInfo.basePriceMonthly;

  let bestRecommendation = null;
  let maxSavings = 0;

  for (const tariff of availableTariffs) {
    let monthlyCost: number;
    
    if (tariff.isDynamic) {
      // For dynamic tariffs, calculate based on typical price pattern
      const typicalPrices = [8, 7, 6, 6, 7, 8, 15, 20, 25, 28, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 9, 8, 8];
      const avgDynamicPrice = typicalPrices.reduce((a, b) => a + b, 0) / typicalPrices.length / 1000;
      monthlyCost = monthlyKwh * avgDynamicPrice + Number(tariff.basePriceMonthly);
    } else {
      monthlyCost = monthlyKwh * Number(tariff.energyPriceKwh) + Number(tariff.basePriceMonthly);
    }

    const savings = currentMonthlyCost - monthlyCost;

    if (savings > maxSavings) {
      maxSavings = savings;
      bestRecommendation = {
        tariff,
        monthlyCost,
        savings,
      };
    }
  }

  if (!bestRecommendation) {
    return null;
  }

  const recommendation: TariffRecommendation = {
    currentTariff: {
      id: current.tariffs.id,
      name: current.tariffs.name,
      monthlyCost: currentMonthlyCost,
    },
    recommendedTariff: {
      id: bestRecommendation.tariff.id,
      name: bestRecommendation.tariff.name,
      monthlyCost: bestRecommendation.monthlyCost,
      reason: bestRecommendation.tariff.isDynamic
        ? 'Dynamischer Tarif passt sich an Strompreise an und spart durchschnittlich 15-25%'
        : 'Dieser Tarif bietet bessere Konditionen für dein Verbrauchsprofil',
    },
    savings: {
      monthly: bestRecommendation.savings,
      yearly: bestRecommendation.savings * 12,
      percent: (bestRecommendation.savings / currentMonthlyCost) * 100,
    },
  };

  // Save recommendation
  await db.insert(optimizationRecommendations).values({
    customerId,
    recommendationType: 'tariff_change',
    title: `Wechsle zu ${bestRecommendation.tariff.name}`,
    description: recommendation.recommendedTariff.reason,
    potentialSavingsMonthly: bestRecommendation.savings,
    priority: recommendation.savings.percent > 10 ? 8 : 5,
    status: 'pending',
  });

  return recommendation;
}

// Calculate optimal tariff for specific usage pattern
export function calculateOptimalTariff(
  hourlyUsage: number[], // 24-hour usage pattern in kWh
  availableTariffs: any[]
): { tariff: any; annualCost: number } {
  
  const results = [];

  for (const tariff of availableTariffs) {
    let annualCost = Number(tariff.basePriceMonthly) * 12;

    for (let hour = 0; hour < 24; hour++) {
      const usage = hourlyUsage[hour] || 0;
      
      if (tariff.isDynamic) {
        // Get actual price for this hour (would come from EPEX in production)
        const pricePerKwh = getTypicalHourlyPrice(hour) / 1000;
        annualCost += usage * pricePerKwh * 365;
      } else {
        annualCost += usage * Number(tariff.energyPriceKwh) * 365;
      }
    }

    results.push({ tariff, annualCost });
  }

  results.sort((a, b) => a.annualCost - b.annualCost);
  return results[0];
}

// Helper: Get typical hourly price (simplified)
function getTypicalHourlyPrice(hour: number): number {
  const prices = [8, 7, 6, 6, 7, 8, 15, 20, 25, 28, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 9, 8, 8];
  return prices[hour] || 10;
}

import { eq } from 'drizzle-orm';
import { optimizationRecommendations } from '../db/schema/optimization.js';
