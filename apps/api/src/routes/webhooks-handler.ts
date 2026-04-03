// Webhook Handler
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import crypto from 'crypto';

interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
}

export async function handleWebhook(
  request: FastifyInstance,
  reply: FastifyReply
) {
  const payload = request.body as WebhookPayload;
  const signature = request.headers['x-webhook-signature'] as string;
  
  // Verify webhook signature
  if (!verifySignature(payload, signature)) {
    return reply.code(401).send({ error: 'Invalid signature' });
  }
  
  // Process webhook based on event type
  switch (payload.event) {
    case 'customer.created':
      await handleCustomerCreated(payload.data);
      break;
    case 'customer.updated':
      await handleCustomerUpdated(payload.data);
      break;
    case 'device.status_changed':
      await handleDeviceStatusChanged(payload.data);
      break;
    case 'invoice.paid':
      await handleInvoicePaid(payload.data);
      break;
    case 'optimization.completed':
      await handleOptimizationCompleted(payload.data);
      break;
    default:
      console.log(`Unknown webhook event: ${payload.event}`);
  }
  
  return reply.send({ received: true });
}

function verifySignature(payload: WebhookPayload, signature: string): boolean {
  const secret = process.env.WEBHOOK_SECRET || '';
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

async function handleCustomerCreated(data: any) {
  console.log('New customer created:', data.customerId);
  // Send welcome email
  // Setup default devices
  // Create initial recommendations
}

async function handleCustomerUpdated(data: any) {
  console.log('Customer updated:', data.customerId);
  // Update cache
  // Sync related records
}

async function handleDeviceStatusChanged(data: any) {
  console.log('Device status changed:', data.deviceId, data.status);
  // Update device state
  // Trigger alerts if needed
  // Log event
}

async function handleInvoicePaid(data: any) {
  console.log('Invoice paid:', data.invoiceId);
  // Update invoice status
  // Send receipt
  // Update customer status
}

async function handleOptimizationCompleted(data: any) {
  console.log('Optimization completed:', data.jobId);
  // Store results
  // Notify customer
  // Update recommendations
}

// Webhook event dispatcher for internal use
export async function dispatchEvent(event: string, data: any) {
  const payload: WebhookPayload = {
    event,
    data,
    timestamp: new Date().toISOString(),
  };
  
  // Get active webhooks for this event
  // Queue webhook deliveries
  console.log(`Dispatching webhook event: ${event}`);
}
