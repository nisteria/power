// Power Database - Schema Definition
// Using Drizzle ORM

import { pgTable, uuid, varchar, timestamp, boolean, integer, decimal, jsonb, text, serial, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const customerStatusEnum = pgEnum('customer_status', ['pending', 'active', 'suspended', 'cancelled']);
export const customerTypeEnum = pgEnum('customer_type', ['residential', 'commercial', 'industrial']);
export const deviceTypeEnum = pgEnum('device_type', ['wallbox', 'battery', 'heat_pump', 'boiler', 'inverter', 'meter']);
export const deviceStatusEnum = pgEnum('device_status', ['pending', 'installed', 'active', 'inactive', 'fault', 'removed']);
export const scheduleStatusEnum = pgEnum('schedule_status', ['pending', 'active', 'completed', 'cancelled', 'failed']);
export const tariffTypeEnum = pgEnum('tariff_type', ['fixed', 'dynamic', 'time_of_use', 'peak_pricing']);

// Customers
export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  companyName: varchar('company_name', { length: 255 }),
  status: customerStatusEnum('status').default('pending'),
  customerType: customerTypeEnum('customer_type').default('residential'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
});

// Addresses
export const addresses = pgTable('addresses', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id),
  street: varchar('street', { length: 255 }).notNull(),
  houseNumber: varchar('house_number', { length: 20 }).notNull(),
  door: varchar('door', { length: 20 }),
  postalCode: varchar('postal_code', { length: 10 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  country: varchar('country', { length: 2 }).default('AT'),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Smart Meters
export const smartMeters = pgTable('smart_meters', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  netzbetreiberId: uuid('netzbetreiber_id').references(() => netzbetreiber.id),
  smartMeterId: varchar('smart_meter_id', { length: 100 }).unique().notNull(),
  serialNumber: varchar('serial_number', { length: 100 }).unique().notNull(),
  deviceType: varchar('device_type', { length: 50 }).notNull(),
  installationDate: timestamp('installation_date'),
  status: varchar('status', { length: 20 }).default('active'),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Netzbetreiber
export const netzbetreiber = pgTable('netzbetreiber', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  shortName: varchar('short_name', { length: 20 }).notNull(),
  baseUrl: varchar('base_url', { length: 500 }),
  apiType: varchar('api_type', { length: 20 }).notNull(),
  authMethod: varchar('auth_method', { length: 20 }).notNull(),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Devices
export const devices = pgTable('devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  deviceType: deviceTypeEnum('device_type').notNull(),
  manufacturer: varchar('manufacturer', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  serialNumber: varchar('serial_number', { length: 100 }).unique(),
  firmwareVersion: varchar('firmware_version', { length: 50 }),
  installationDate: timestamp('installation_date'),
  warrantyExpiry: timestamp('warranty_expiry'),
  status: deviceStatusEnum('device_status').default('pending'),
  config: jsonb('config').default({}),
  capabilities: jsonb('capabilities').default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Device States
export const deviceStates = pgTable('device_states', {
  id: uuid('id').defaultRandom().primaryKey(),
  deviceId: uuid('device_id').references(() => devices.id).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
  stateData: jsonb('state_data').notNull(),
  socPercent: decimal('soc_percent', { precision: 5, scale: 2 }),
  powerKw: decimal('power_kw', { precision: 8, scale: 3 }),
  errorCode: varchar('error_code', { length: 20 }),
  errorMessage: text('error_message'),
});

// Device Schedules
export const deviceSchedules = pgTable('device_schedules', {
  id: uuid('id').defaultRandom().primaryKey(),
  deviceId: uuid('device_id').references(() => devices.id).notNull(),
  scheduleType: varchar('schedule_type', { length: 20 }).notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  targetValue: decimal('target_value', { precision: 10, scale: 2 }),
  priority: integer('priority').default(5),
  status: scheduleStatusEnum('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tariffs
export const tariffs = pgTable('tariffs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  tariffType: tariffTypeEnum('tariff_type').notNull(),
  netzbetreiberId: uuid('netzbetreiber_id').references(() => netzbetreiber.id),
  validFrom: timestamp('valid_from').notNull(),
  validUntil: timestamp('valid_until'),
  basePriceMonthly: decimal('base_price_monthly', { precision: 10, scale: 2 }).default('0'),
  energyPriceKwh: decimal('energy_price_kwh', { precision: 8, scale: 4 }).notNull(),
  gridFeeKwh: decimal('grid_fee_kwh', { precision: 8, scale: 4 }),
  taxPercent: decimal('tax_percent', { precision: 5, scale: 2 }).default('20'),
  peakHours: jsonb('peak_hours'),
  offPeakHours: jsonb('off_peak_hours'),
  isDynamic: boolean('is_dynamic').default(false),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Customer Tariffs
export const customerTariffs = pgTable('customer_tariffs', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  tariffId: uuid('tariff_id').references(() => tariffs.id).notNull(),
  meterId: uuid('meter_id').references(() => smartMeters.id),
  contractStart: timestamp('contract_start').notNull(),
  contractEnd: timestamp('contract_end'),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Invoices
export const invoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).unique().notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  billingPeriodStart: timestamp('billing_period_start').notNull(),
  billingPeriodEnd: timestamp('billing_period_end').notNull(),
  subtotalCents: integer('subtotal_cents').notNull(),
  taxCents: integer('tax_cents').notNull(),
  totalCents: integer('total_cents').notNull(),
  currency: varchar('currency', { length: 3 }).default('EUR'),
  status: varchar('status', { length: 20 }).default('draft'),
  issuedAt: timestamp('issued_at'),
  dueDate: timestamp('due_date'),
  paidAt: timestamp('paid_at'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// EPEX Prices
export const epexPrices = pgTable('epex_prices', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(),
  hour: integer('hour').notNull(),
  priceEurMwh: decimal('price_eur_mwh', { precision: 10, scale: 4 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Optimization Jobs
export const optimizationJobs = pgTable('optimization_jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  jobType: varchar('job_type', { length: 30 }).notNull(),
  status: varchar('status', { length: 20 }).default('pending'),
  parameters: jsonb('parameters').default({}),
  result: jsonb('result'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const customersRelations = relations(customers, ({ one, many }) => ({
  address: one(addresses, { fields: [customers.id], references: [addresses.customerId] }),
  devices: many(devices),
  smartMeters: many(smartMeters),
  invoices: many(invoices),
}));

export const devicesRelations = relations(devices, ({ one, many }) => ({
  customer: one(customers, { fields: [devices.customerId], references: [customers.id] }),
  states: many(deviceStates),
  schedules: many(deviceSchedules),
}));

export const deviceStatesRelations = relations(deviceStates, ({ one }) => ({
  device: one(devices, { fields: [deviceStates.deviceId], references: [devices.id] }),
}));

export const deviceSchedulesRelations = relations(deviceSchedules, ({ one }) => ({
  device: one(devices, { fields: [deviceSchedules.deviceId], references: [devices.id] }),
}));

export const smartMetersRelations = relations(smartMeters, ({ one, many }) => ({
  customer: one(customers, { fields: [smartMeters.customerId], references: [customers.id] }),
  netzbetreiber: one(netzbetreiber, { fields: [smartMeters.netzbetreiberId], references: [netzbetreiber.id] }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  customer: one(customers, { fields: [invoices.customerId], references: [customers.id] }),
}));

// Type exports
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Device = typeof devices.$inferSelect;
export type NewDevice = typeof devices.$inferInsert;
export type DeviceState = typeof deviceStates.$inferSelect;
export type DeviceSchedule = typeof deviceSchedules.$inferSelect;
export type SmartMeter = typeof smartMeters.$inferSelect;
export type Tariff = typeof tariffs.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
