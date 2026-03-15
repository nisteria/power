// Optimization Worker - Battery/Storage Optimization
import { db } from '../lib/db.js';
import { logger } from '../lib/logger.js';
import { getOptimalChargeSlots } from '../../api/src/lib/tariff-engine.js';

export interface OptimizationResult {
  siteId: string;
  recommendedActions: {
    deviceId: string;
    action: 'charge' | 'discharge' | 'idle';
    targetPowerKw?: number;
    targetSocPct?: number;
    reason: string;
    savingsEur?: number;
  }[];
  estimatedDailySavings: number;
}

export async function runOptimizationJob(): Promise<void> {
  logger.info('Starting optimization job');

  try {
    // Get all active sites with batteries
    const sites = await db.sites.findMany({
      where: { status: 'active' },
      include: {
        devices: {
          where: { type: 'battery' },
        },
      },
    });

    for (const site of sites) {
      if (site.devices.length === 0) continue;

      const result = await optimizeSite(site.id);
      
      // Store optimization result
      await db.optimizationResults.create({
        data: {
          id: crypto.randomUUID(),
          siteId: site.id,
          result: result,
          createdAt: new Date(),
        },
      });

      logger.info(`Optimization completed for site ${site.id}`, {
        savings: result.estimatedDailySavings,
      });
    }

    logger.info('Optimization job completed');
  } catch (error) {
    logger.error('Optimization job failed', { error });
    throw error;
  }
}

async function optimizeSite(siteId: string): Promise<OptimizationResult> {
  const recommendedActions: OptimizationResult['recommendedActions'] = [];
  
  // Get current tariff data
  const tariffs = await db.tariffSlots.findMany({
    where: {
      siteId,
      startTime: { gte: new Date() },
    },
    orderBy: { startTime: 'asc' },
    take: 24,
  });

  // Get devices
  const devices = await db.devices.findMany({
    where: { siteId },
  });

  const battery = devices.find(d => d.type === 'battery');
  
  if (!battery) {
    return {
      siteId,
      recommendedActions: [],
      estimatedDailySavings: 0,
    };
  }

  // Calculate optimal charge/discharge strategy
  const currentHour = new Date().getHours();
  const isPeakHour = currentHour >= 17 && currentHour <= 21;
  const isLowPriceHour = currentHour >= 0 && currentHour <= 5;

  // Find cheapest hours in next 24h
  const cheapestHours = tariffs
    .sort((a, b) => a.priceEurPerKwh - b.priceEurPerKwh)
    .slice(0, 5);

  if (isLowPriceHour && battery.status === 'idle') {
    // Charge during low price hours
    recommendedActions.push({
      deviceId: battery.id,
      action: 'charge',
      targetPowerKw: battery.maxPowerKw,
      targetSocPct: 100,
      reason: 'Low tariff - charge battery',
      savingsEur: 2.5, // Estimated
    });
  } else if (isPeakHour && battery.status === 'charged') {
    // Discharge during peak hours
    recommendedActions.push({
      deviceId: battery.id,
      action: 'discharge',
      targetPowerKw: battery.maxPowerKw,
      targetSocPct: 20,
      reason: 'Peak tariff - discharge battery',
      savingsEur: 5.0, // Estimated
    });
  } else {
    recommendedActions.push({
      deviceId: battery.id,
      action: 'idle',
      reason: 'No optimization opportunity',
    });
  }

  const estimatedDailySavings = recommendedActions.reduce(
    (sum, action) => sum + (action.savingsEur || 0),
    0
  );

  return {
    siteId,
    recommendedActions,
    estimatedDailySavings: Math.round(estimatedDailySavings * 100) / 100,
  };
}

// Cron schedule: Every hour
export const CRON_SCHEDULE = '0 * * * *';

// Run manually for testing
runOptimizationJob()
  .then(() => process.exit(0))
  .catch((err) => {
    logger.error('Fatal error', { error: err });
    process.exit(1);
  });
