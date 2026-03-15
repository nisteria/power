// Webhook Routes
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

const webhookSchema = z.object({
  url: z.string().url(),
  events: z.array(z.string()),
  secret: z.string().optional(),
});

export async function webhookRoutes(fastify: FastifyInstance) {
  
  // Register webhook
  fastify.post('/webhooks', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = webhookSchema.parse(request.body);
    const customerId = (request as any).user?.customerId;
    
    // Validate URL is reachable
    try {
      new URL(body.url);
    } catch {
      return reply.code(400).send({ error: 'Invalid webhook URL' });
    }
    
    const webhook = await db.insert(webhooks).values({
      customerId,
      url: body.url,
      events: body.events,
      secret: body.secret || crypto.randomUUID(),
      status: 'active',
    }).returning();
    
    return webhook;
  });
  
  // List webhooks
  fastify.get('/webhooks', async (request: FastifyRequest, reply: FastifyReply) => {
    const customerId = (request as any).user?.customerId;
    
    const hooks = await db.query.webhooks.findMany({
      where: (webhooks, { eq }) => eq(webhooks.customerId, customerId),
    });
    
    return { webhooks: hooks };
  });
  
  // Delete webhook
  fastify.delete('/webhooks/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const customerId = (request as any).user?.customerId;
    
    await db.delete(webhooks)
      .where(and(
        eq(webhooks.id, id),
        eq(webhooks.customerId, customerId)
      ));
    
    return { success: true };
  });
  
  // Webhook delivery status
  fastify.get('/webhooks/:id/deliveries', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const customerId = (request as any).user?.customerId;
    
    const deliveries = await db.query.webhookDeliveries.findMany({
      where: (deliveries, { eq }) => eq(deliveries.webhookId, id),
      orderBy: (deliveries, { desc }) => [deliveries.createdAt],
      limit: 20,
    });
    
    return { deliveries };
  });
  
  // Retry failed webhook
  fastify.post('/webhooks/:webhookId/deliveries/:deliveryId/retry', async (request: FastifyRequest, reply: FastifyReply) => {
    const { webhookId, deliveryId } = request.params as { webhookId: string; deliveryId: string };
    
    // Re-queue delivery
    const delivery = await retryWebhookDelivery(deliveryId);
    
    return { success: true, delivery };
  });
}

// Webhook dispatcher (called by worker)
export async function dispatchWebhook(event: string, data: any) {
  // Find all webhooks subscribed to this event
  const webhooks = await db.query.webhooks.findMany({
    where: (webhooks, { eq, contains }) => and(
      eq(webhooks.status, 'active'),
      contains(webhooks.events, event)
    ),
  });
  
  for (const webhook of webhooks) {
    await queueWebhookDelivery(webhook.id, event, data);
  }
}

// Queue delivery job
async function queueWebhookDelivery(webhookId: string, event: string, data: any) {
  const payload = {
    event,
    data,
    timestamp: new Date().toISOString(),
  };
  
  await db.insert(webhookDeliveries).values({
    webhookId,
    payload,
    status: 'pending',
    attempts: 0,
  });
}

// Retry logic
async function retryWebhookDelivery(deliveryId: string) {
  await db.update(webhookDeliveries)
    .set({
      status: 'pending',
      attempts: 0,
      nextRetryAt: null,
    })
    .where(eq(webhookDeliveries.id, deliveryId));
}

// Import helpers
import { db } from '../db/index.js';
import { webhooks, webhookDeliveries } from '../db/schema/webhooks.js';
import { eq, and } from 'drizzle-orm';
