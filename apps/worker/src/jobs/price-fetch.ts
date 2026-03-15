// Price Fetch Worker - Day-Ahead Prices
import { fetchDayAheadPrices } from '../lib/price-fetcher.js';
import { db } from '../lib/db.js';
import { logger } from '../lib/logger.js';

const PRICE_SOURCE = 'epex-spot-at'; // Austrian day-ahead market

export async function runPriceFetchJob(): Promise<void> {
  logger.info('Starting price fetch job');

  try {
    // Fetch day-ahead prices for Austria
    const prices = await fetchDayAheadPrices();

    if (!prices || prices.length === 0) {
      logger.warn('No prices fetched from EPEX Spot');
      return;
    }

    // Store in database
    for (const price of prices) {
      await db.pricePoints.create({
        data: {
          id: crypto.randomUUID(),
          timestamp: price.timestamp,
          priceEurPerMwh: price.price,
          source: PRICE_SOURCE,
          market: 'day-ahead',
          createdAt: new Date(),
        },
      });
    }

    logger.info(`Price fetch job completed: ${prices.length} prices stored`);
  } catch (error) {
    logger.error('Price fetch job failed', { error });
    throw error;
  }
}

// Cron schedule: Every day at 12:00 and 14:00 (after day-ahead auction)
export const CRON_SCHEDULE = '0 12,14 * * *';

// Run manually for testing
runPriceFetchJob()
  .then(() => process.exit(0))
  .catch((err) => {
    logger.error('Fatal error', { error: err });
    process.exit(1);
  });
