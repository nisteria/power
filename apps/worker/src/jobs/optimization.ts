// Background Worker - Optimization Job
import { db } from '../lib/db.js';
import { runOptimization } from './lib/optimization-engine.js';
import { sendTariffAlert } from './lib/notifications.js';
import { getCurrentTariff } from './lib/tariff-engine.js';

const TARIFF_HIGH_THRESHOLD = 0.20; // EUR/kWh
const TARIFF_LOW_THRESHOLD = 0.08; // EUR/kWh

export async function runOptimizationJob(): Promise<void> {
  console.log('[Optimization Worker] Starting optimization job...');
  
  try {
    // Get all active sites
    const sites = await db.sites.findMany({
      where: { status: 'active' },
      include: { devices: true },
    });

    console.log(`[Optimization Worker] Found ${sites.length} active sites`);

    for (const site of sites) {
      try {
        // Run optimization for this site
        const recommendations = await runOptimization(site.id);
        
        // Check if we need to send tariff alerts
        const currentTariff = await getCurrentTariff(site.id);
        if (currentTariff) {
          const price = currentTariff.priceEurPerKwh;
          
          if (price >= TARIFF_HIGH_THRESHOLD) {
            // High tariff - notify user to discharge
            await sendTariffAlert(site.userId, price, true);
          } else if (price <= TARIFF_LOW_THRESHOLD) {
            // Low tariff - notify user to charge
            await sendTariffAlert(site.userId, price, false);
          }
        }

        console.log(`[Optimization Worker] Site ${site.id}: ${recommendations.length} recommendations generated`);
      } catch (error) {
        console.error(`[Optimization Worker] Error optimizing site ${site.id}:`, error);
      }
    }

    console.log('[Optimization Worker] Optimization job completed');
  } catch (error) {
    console.error('[Optimization Worker] Fatal error:', error);
    throw error;
  }
}

// Price fetch worker - gets day-ahead prices
export async function runPriceFetchJob(): Promise<void> {
  console.log('[Price Worker] Starting price fetch job...');
  
  try {
    // This would connect to a real price API (e.g., ENTSO-E, aWATTar)
    // For now, we'll generate mock data
    
    const sites = await db.sites.findMany({
      where: { status: 'active' },
    });

    for (const site of sites) {
      // Generate 24 hourly prices for tomorrow
      const prices = generateMockPrices();
      
      // Store in database
      for (const price of prices) {
        await db.tariffSlots.create({
          data: {
            id: crypto.randomUUID(),
            siteId: site.id,
            startTime: price.startTime,
            endTime: price.endTime,
            priceEurPerKwh: price.price,
            source: 'day-ahead',
            createdAt: new Date(),
          },
        });
      }

      console.log(`[Price Worker] Updated tariffs for site ${site.id}: ${prices.length} slots`);
    }

    console.log('[Price Worker] Price fetch job completed');
  } catch (error) {
    console.error('[Price Worker] Fatal error:', error);
    throw error;
  }
}

function generateMockPrices(): { startTime: Date; endTime: Date; price: number }[] {
  const prices: { startTime: Date; endTime: Date; price: number }[] = [];
  const now = new Date();
  
  // Start from midnight tonight
  const startOfDay = new Date(now);
  startOfDay.setHours(24, 0, 0, 0);

  for (let hour = 0; hour < 24; hour++) {
    const start = new Date(startOfDay);
    start.setHours(hour);
    
    const end = new Date(startOfDay);
    end.setHours(hour + 1);

    // Simulate realistic Austrian day-ahead prices (EUR/kWh)
    // Low at night, high during peak hours
    let basePrice = 0.08;
    if (hour >= 6 && hour < 9) basePrice = 0.15; // Morning peak
    else if (hour >= 17 && hour < 21) basePrice = 0.22; // Evening peak
    else if (hour >= 0 && hour < 5) basePrice = 0.05; // Night
    
    // Add some randomness
    const price = basePrice + (Math.random() * 0.04 - 0.02);
    
    prices.push({ startTime: start, endTime: end, price });
  }

  return prices;
}

// Run as main
if (import.meta.main) {
  console.log('[Worker] Starting background worker...');
  
  // Check command line args
  const job = process.argv[2] || 'optimization';
  
  switch (job) {
    case 'optimization':
      runOptimizationJob().then(() => process.exit(0));
      break;
    case 'prices':
      runPriceFetchJob().then(() => process.exit(0));
      break;
    default:
      console.error(`Unknown job: ${job}`);
      process.exit(1);
  }
}
