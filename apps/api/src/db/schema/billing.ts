// Billing Schema - Drizzle Tables
import { pgTable, uuid, varchar, timestamp, integer, decimal, text, serial } from 'drizzle-orm/pg-core';

// Invoices
export const invoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).unique().notNull(),
  customerId: uuid('customer_id').notNull(),
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

// Invoice Items
export const invoiceItems = pgTable('invoice_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoiceId: uuid('invoice_id').notNull(),
  description: varchar('description', { length: 500 }).notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 4 }).default('1'),
  unit: varchar('unit', { length: 20 }),
  unitPriceCents: integer('unit_price_cents').notNull(),
  totalPriceCents: integer('total_price_cents').notNull(),
  taxPercent: decimal('tax_percent', { precision: 5, scale: 2 }).default('20'),
  periodStart: timestamp('period_start'),
  periodEnd: timestamp('period_end'),
});

// Customer Tariffs
export const customerTariffs = pgTable('customer_tariffs', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').notNull(),
  tariffId: uuid('tariff_id').notNull(),
  meterId: uuid('meter_id'),
  contractStart: timestamp('contract_start').notNull(),
  contractEnd: timestamp('contract_end'),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Optimization Recommendations
export const optimizationRecommendations = pgTable('optimization_recommendations', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').notNull(),
  recommendationType: varchar('recommendation_type', { length: 30 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('notNull'),
  potentialSavingsMonthly: decimal('potential_savings_monthly', { precision: 10, scale: 2 }),
  priority: integer('priority').default(5),
  status: varchar('status', { length: 20 }).default('pending'),
  implementedAt: timestamp('implemented_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Types
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type CustomerTariff = typeof customerTariffs.$inferSelect;
export type OptimizationRecommendation = typeof optimizationRecommendations.$inferSelect;
