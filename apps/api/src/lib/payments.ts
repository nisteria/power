// Payment Service - Stripe Integration
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function createCustomer(email: string, name: string) {
  return stripe.customers.create({
    email,
    name,
    metadata: {
      source: 'power-energy',
    },
  });
}

export async function createSubscription(customerId: string, priceId: string) {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });
}

export async function createPaymentIntent(amount: number, currency: string = 'eur') {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
  });
}

export async function handleWebhook(payload: Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
