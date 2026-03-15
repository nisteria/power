// Price Fetcher - Day-Ahead Market Prices
import { logger } from './logger.js';

export interface DayAheadPrice {
  timestamp: Date;
  price: number; // EUR/MWh
  volume?: number; // MWh
}

const EPEX_SPOT_API = 'https://api.epexspot.com';

/**
 * Fetch day-ahead prices from EPEX Spot for Austria
 */
export async function fetchDayAheadPrices(): Promise<DayAheadPrice[]> {
  logger.info('Fetching day-ahead prices from EPEX Spot');

  try {
    // In production, use actual EPEX Spot API
    // For now, generate realistic mock data based on typical AT price patterns
    const prices: DayAheadPrice[] = [];
    const now = new Date();
    
    // Get tomorrow's date
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // Generate 24 hourly prices (typical day-ahead auction results)
    for (let hour = 0; hour < 24; hour++) {
      const timestamp = new Date(tomorrow);
      timestamp.setHours(hour);

      // Simulate typical Austrian day-ahead prices (EUR/MWh)
      // Base around 80-120 EUR/MWh with variation
      const basePrice = 85;
      const hourVariation = Math.sin((hour - 6) * Math.PI / 12) * 30; // Peak at 18:00
      const randomVariation = (Math.random() - 0.5) * 20;
      const price = Math.max(0, basePrice + hourVariation + randomVariation);

      prices.push({
        timestamp,
        price: Math.round(price * 100) / 100,
        volume: 100 + Math.random() * 50,
      });
    }

    logger.info(`Fetched ${prices.length} day-ahead prices`);
    return prices;
  } catch (error) {
    logger.error('Failed to fetch day-ahead prices', { error });
    throw error;
  }
}

/**
 * Fetch intraday prices (continuous trading)
 */
export async function fetchIntradayPrices(): Promise<DayAheadPrice[]> {
  logger.info('Fetching intraday prices');

  // Similar structure for intraday
  const prices: DayAheadPrice[] = [];
  const now = new Date();

  for (let hour = 0; hour < 24; hour++) {
    const timestamp = new Date(now);
    timestamp.setHours(hour);

    const price = 75 + Math.random() * 40;
    prices.push({
      timestamp,
      price: Math.round(price * 100) / 100,
    });
  }

  return prices;
}

/**
 * Calculate average price for a period
 */
export function calculateAveragePrice(prices: DayAheadPrice[]): number {
  if (prices.length === 0) return 0;
  const sum = prices.reduce((acc, p) => acc + p.price, 0);
  return Math.round((sum / prices.length) * 100) / 100;
}

/**
 * Find cheapest hours for charging
 */
export function findCheapestHours(
  prices: DayAheadPrice[],
  hours: number
): DayAheadPrice[] {
  return [...prices]
    .sort((a, b) => a.price - b.price)
    .slice(0, hours);
}
