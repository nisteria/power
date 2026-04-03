// Power Worker - Entry Point
import { createWorker } from './src/worker.js';

const worker = createWorker({
  concurrency: 5,
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

// Register jobs
worker.register('price:fetch', async (job) => {
  console.log(`[${job.id}] Fetching EPEX prices...`);
  // Fetch day-ahead prices from EPEX Spot
  // Store in database
  return { fetched: true, count: 24 };
});

worker.register('optimize:customer', async (job) => {
  console.log(`[${job.id}] Running optimization for customer ${job.data.customerId}`);
  // Load customer data
  // Run optimization algorithm (battery charge/discharge)
  // Save schedules
  return { optimized: true, savings: 15.50 };
});

worker.register('billing:generate', async (job) => {
  console.log(`[${job.id}] Generating invoice for ${job.data.customerId}`);
  // Calculate usage
  // Generate invoice items
  // Send to customer
  return { invoiceId: 'INV-2026-0001', amount: 1490 };
});

worker.register('device:sync', async (job) => {
  console.log(`[${job.id}] Syncing device ${job.data.deviceId}`);
  // Fetch device state from API
  // Update database
  return { synced: true };
});

worker.register('alert:evaluate', async (job) => {
  console.log(`[${job.id}] Evaluating alert rules...`);
  // Check metrics against thresholds
  // Trigger alerts if needed
  return { alerts: 0 };
});

worker.register('tariff:update', async (job) => {
  console.log(`[${job.id}] Updating day-ahead tariffs...`);
  // Fetch latest tariffs
  // Update site tariff schedules
  return { updated: true };
});

// Start worker
worker.start().then(() => {
  console.log('Power Worker started');
});

export { worker };
