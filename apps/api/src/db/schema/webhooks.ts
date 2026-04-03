// Webhooks Schema
import { pgTable, uuid, varchar, jsonb, timestamp, text, integer } from 'drizzle-orm/pg-core';

export const webhooks = pgTable('webhooks', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  events: jsonb('events').notNull(), // Array of event names
  secret: varchar('secret', { length: 100 }),
  status: varchar('status', { length: 20 }).default('active'),
  lastTriggeredAt: timestamp('last_triggered_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const webhookDeliveries = pgTable('webhook_deliveries', {
  id: uuid('id').defaultRandom().primaryKey(),
  webhookId: uuid('webhook_id').references(() => webhooks.id).notNull(),
  payload: jsonb('payload').notNull(),
  status: varchar('status', { length: 20 }).default('pending'),
  attempts: integer('attempts').default(0),
  responseStatus: integer('response_status'),
  responseBody: text('response_body'),
  nextRetryAt: timestamp('next_retry_at'),
  deliveredAt: timestamp('delivered_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Types
export type Webhook = typeof webhooks.$inferSelect;
export type WebhookDelivery = typeof webhookDeliveries.$inferSelect;
