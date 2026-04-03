// Database Seed Script - Development Data
// Run with: pnpm db:seed

import { db } from './src/db/index.js';
import { customers, addresses, devices, smartMeters, tariffs, netzbetreiber } from './src/db/schema/index.js';
import { hash } from 'bcryptjs';

async function seed() {
  console.log('🌱 Starting database seed...');

  // Seed Netzbetreiber
  console.log('📡 Seeding netzbetreiber...');
  await db.insert(netzbetreiber).values([
    { name: 'Wiener Netze GmbH', shortName: 'WNG', apiType: 'rest', authMethod: 'oauth2', status: 'active' },
    { name: 'Netz Oberösterreich GmbH', shortName: 'OÖ', apiType: 'rest', authMethod: 'oauth2', status: 'active' },
    { name: 'Salzburg Netz GmbH', shortName: 'SNG', apiType: 'rest', authMethod: 'oauth2', status: 'active' },
  ]).onConflictDoNothing();

  // Get netzbetreiber IDs
  const wb = await db.select().from(netzbetreiber).where(eq(netzbetreiber.shortName, 'WNG'));
  const wienerId = wb[0]?.id;

  // Seed demo customer
  console.log('👤 Seeding demo customer...');
  const passwordHash = await hash('demo1234', 10);
  
  const [customer] = await db.insert(customers).values({
    email: 'demo@power.energy',
    passwordHash,
    firstName: 'Demo',
    lastName: 'User',
    phone: '+43 664 123 4567',
    status: 'active',
    customerType: 'residential',
  }).onConflictDoNothing().returning();

  if (customer) {
    // Seed address
    console.log('🏠 Seeding address...');
    await db.insert(addresses).values({
      customerId: customer.id,
      street: 'Musterstraße',
      houseNumber: '15',
      door: '2a',
      postalCode: '1010',
      city: 'Wien',
      country: 'AT',
    });

    // Seed smart meter
    console.log('⚡ Seeding smart meter...');
    await db.insert(smartMeters).values({
      customerId: customer.id,
      netzbetreiberId: wienerId,
      smartMeterId: 'AT123456789012345678',
      serialNumber: 'SM-2026-001234',
      deviceType: 'smart_complex',
      status: 'active',
    });

    // Seed devices
    console.log('🔋 Seeding devices...');
    await db.insert(devices).values([
      {
        customerId: customer.id,
        deviceType: 'battery',
        manufacturer: 'BYD',
        model: 'HVS 12.8',
        serialNumber: 'BYD-2026-001234',
        firmwareVersion: '3.2.1',
        status: 'active',
        config: { minSocPercent: 20, maxSocPercent: 90 },
        capabilities: ['charge', 'discharge', 'monitor'],
      },
      {
        customerId: customer.id,
        deviceType: 'wallbox',
        manufacturer: 'Wallbox',
        model: 'Pulsar',
        serialNumber: 'WB-2026-567890',
        firmwareVersion: '2.1.0',
        status: 'active',
        config: { maxChargeRate: 22 },
        capabilities: ['charge', 'monitor'],
      },
      {
        customerId: customer.id,
        deviceType: 'heat_pump',
        manufacturer: 'Vaillant',
        model: 'auroPOWER',
        serialNumber: 'VP-2026-123456',
        firmwareVersion: '1.8.2',
        status: 'active',
        config: { targetTemp: 21 },
        capabilities: ['heat', 'monitor'],
      },
    ]);
  }

  // Seed tariffs
  console.log('💰 Seeding tariffs...');
  await db.insert(tariffs).values([
    {
      name: 'Wiener Netze Fix',
      tariffType: 'fixed',
      validFrom: new Date('2026-01-01'),
      basePriceMonthly: 4.90,
      energyPriceKwh: 0.28,
      gridFeeKwh: 0.045,
      taxPercent: 20,
      isDynamic: false,
      status: 'active',
    },
    {
      name: 'Wiener Netze Dynamic',
      tariffType: 'dynamic',
      validFrom: new Date('2026-01-01'),
      basePriceMonthly: 2.90,
      energyPriceKwh: 0.18,
      gridFeeKwh: 0.045,
      taxPercent: 20,
      isDynamic: true,
      status: 'active',
    },
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('📧 Demo login: demo@power.energy / demo1234');
}

seed()
  .catch(console.error)
  .finally(() => process.exit());

import { eq } from 'drizzle-orm';
