// Optimization Engine Service
import { db } from '../db/index.js';
import { getCurrentTariff, getOptimalChargeSlots } from './tariff-engine.js';
import { getActiveCommands } from './device-control.js';

export interface OptimizationScenario {
  id: string;
  siteId: string;
  scenarioType: 'charge' | 'discharge' | 'hold' | 'arbitrage';
  targetKwh?: number;
  expectedSavings: number;
  confidence: number;
  createdAt: Date;
}

export interface OptimizationRecommendation {
  action: 'charge' | 'discharge' | 'hold';
  deviceId: string;
  targetPowerKw?: number;
  targetSocPct?: number;
  reason: string;
  expectedSavingsEur: number;
  priority: number;
}

const TARIFF_THRESHOLD_LOW = 0.08; // EUR/kWh - charge battery
const TARIFF_THRESHOLD_HIGH = 0.20; // EUR/kWh - discharge battery

export async function runOptimization(siteId: string): Promise<OptimizationRecommendation[]> {
  const recommendations: OptimizationRecommendation[] = [];
  
  // Get current tariff
  const currentTariff = await getCurrentTariff(siteId);
  const currentPrice = currentTariff?.priceEurPerKwh || 0.15;
  
  // Get site devices (batteries)
  const devices = await db.devices.findMany({
    where: {
      siteId,
      type: 'battery',
      status: 'active',
    },
  });

  // Get active commands
  const activeCommands = await getActiveCommands(siteId);

  for (const device of devices) {
    // Check if device has active command
    const hasActiveCommand = activeCommands.some(
      cmd => cmd.deviceId === device.id && 
      ['pending', 'sent', 'acknowledged'].includes(cmd.status)
    );

    if (hasActiveCommand) {
      recommendations.push({
        action: 'hold',
        deviceId: device.id,
        reason: 'Device has active command, waiting for completion',
        expectedSavingsEur: 0,
        priority: 0,
      });
      continue;
    }

    // Decision logic based on current tariff
    if (currentPrice <= TARIFF_THRESHOLD_LOW) {
      // Low tariff: Charge battery
      const maxChargeKw = device.maxPowerKw || 11;
      recommendations.push({
        action: 'charge',
        deviceId: device.id,
        targetPowerKw: maxChargeKw,
        targetSocPct: 100,
        reason: `Low tariff (${currentPrice.toFixed(3)} €/kWh) - charge battery`,
        expectedSavingsEur: maxChargeKw * currentPrice,
        priority: 10,
      });
    } else if (currentPrice >= TARIFF_THRESHOLD_HIGH) {
      // High tariff: Discharge battery
      const maxDischargeKw = device.maxPowerKw || 11;
      recommendations.push({
        action: 'discharge',
        deviceId: device.id,
        targetPowerKw: maxDischargeKw,
        reason: `High tariff (${currentPrice.toFixed(3)} €/kWh) - discharge battery`,
        expectedSavingsEur: maxDischargeKw * (currentPrice - TARIFF_THRESHOLD_LOW),
        priority: 10,
      });
    } else {
      // Medium tariff: Hold
      recommendations.push({
        action: 'hold',
        deviceId: device.id,
        reason: `Medium tariff (${currentPrice.toFixed(3)} €/kWh) - hold battery`,
        expectedSavingsEur: 0,
        priority: 5,
      });
    }
  }

  // Sort by priority (highest first)
  return recommendations.sort((a, b) => b.priority - a.priority);
}

export async function calculateArbitrageOpportunity(siteId: string): Promise<{
  chargeWindow: { start: Date; end: Date } | null;
  dischargeWindow: { start: Date; end: Date } | null;
  potentialSavings: number;
}> {
  // Get today's tariffs
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tariffs = await db.tariffSlots.findMany({
    where: {
      siteId,
      startTime: { gte: today, lt: tomorrow },
    },
    orderBy: { startTime: 'asc' },
  });

  if (tariffs.length === 0) {
    return {
      chargeWindow: null,
      dischargeWindow: null,
      potentialSavings: 0,
    };
  }

  // Find cheapest hour (charge) and most expensive hour (discharge)
  let cheapestHour = tariffs[0];
  let mostExpensiveHour = tariffs[0];

  for (const tariff of tariffs) {
    if (tariff.priceEurPerKwh < cheapestHour.priceEurPerKwh) {
      cheapestHour = tariff;
    }
    if (tariff.priceEurPerKwh > mostExpensiveHour.priceEurPerKwh) {
      mostExpensiveHour = tariff;
    }
  }

  const priceDiff = mostExpensiveHour.priceEurPerKwh - cheapestHour.priceEurPerKwh;
  const batteryCapacityKwh = 13.5; // Assume Tesla Powerwall equivalent

  return {
    chargeWindow: {
      start: cheapestHour.startTime,
      end: cheapestHour.endTime,
    },
    dischargeWindow: {
      start: mostExpensiveHour.startTime,
      end: mostExpensiveHour.endTime,
    },
    potentialSavings: batteryCapacityKwh * priceDiff,
  };
}

export async function createOptimizationScenario(
  siteId: string,
  scenarioType: OptimizationScenario['scenarioType'],
  targetKwh?: number
): Promise<OptimizationScenario> {
  const arbitrage = await calculateArbitrageOpportunity(siteId);
  
  return db.optimizationScenarios.create({
    data: {
      id: crypto.randomUUID(),
      siteId,
      scenarioType,
      targetKwh,
      expectedSavings: arbitrage.potentialSavings,
      confidence: 0.85, // Placeholder - would use ML model
      createdAt: new Date(),
    },
  });
}
