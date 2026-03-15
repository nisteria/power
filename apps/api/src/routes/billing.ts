// Billing Routes
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { invoices, invoiceItems, customerTariffs } from '../db/schema/billing.js';

export async function billingRoutes(fastify: FastifyInstance) {
  
  // Get invoices
  fastify.get('/invoices', async (request: FastifyRequest, reply: FastifyReply) => {
    const customerId = (request as any).user?.customerId;
    const status = (request.query as any).status || 'all';
    const limit = parseInt((request.query as any).limit || '20');
    const offset = parseInt((request.query as any).offset || '0');
    
    let query = db.select().from(invoices)
      .where(eq(invoices.customerId, customerId))
      .orderBy(desc(invoices.createdAt))
      .limit(limit)
      .offset(offset);
    
    if (status !== 'all') {
      query = query.where(eq(invoices.status, status));
    }
    
    const invoiceList = await query;
    
    // Get total count
    const countResult = await db.select({ count: count() })
      .from(invoices)
      .where(eq(invoices.customerId, customerId));
    
    return {
      invoices: invoiceList,
      total: countResult[0]?.count || 0,
      limit,
      offset,
    };
  });
  
  // Get invoice details
  fastify.get('/invoices/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const customerId = (request as any).user?.customerId;
    
    const invoice = await db.select()
      .from(invoices)
      .where(and(
        eq(invoices.id, id),
        eq(invoices.customerId, customerId)
      ))
      .limit(1);
    
    if (invoice.length === 0) {
      return reply.code(404).send({ error: 'Invoice not found' });
    }
    
    const items = await db.select()
      .from(invoiceItems)
      .where(eq(invoiceItems.invoiceId, id));
    
    return {
      ...invoice[0],
      items,
    };
  });
  
  // Generate invoice (typically called by worker)
  fastify.post('/generate', async (request: FastifyRequest, reply: FastifyReply) => {
    // This endpoint is usually called by the system/worker
    // Not directly by customers
    
    const { customerId, billingPeriod } = request.body as any;
    
    // Get customer's active tariff
    const activeTariff = await db.select()
      .from(customerTariffs)
      .where(and(
        eq(customerTariffs.customerId, customerId),
        eq(customerTariffs.status, 'active')
      ))
      .limit(1);
    
    if (activeTariff.length === 0) {
      return reply.code(400).send({ error: 'No active tariff found' });
    }
    
    // Generate invoice number
    const year = new Date().getFullYear();
    const month = String(billingPeriod.month).padStart(2, '0');
    const countResult = await db.select({ count: count() })
      .from(invoices)
      .where(sql`EXTRACT(YEAR FROM created_at) = ${year}`);
    
    const invoiceNumber = `INV-${year}-${month}-${String((countResult[0]?.count || 0) + 1).padStart(4, '0')}`;
    
    // Calculate amount (simplified)
    const baseAmount = 1490; // 14.90 EUR
    const taxAmount = Math.round(baseAmount * 0.2);
    const totalAmount = baseAmount + taxAmount;
    
    // Create invoice
    const [invoice] = await db.insert(invoices).values({
      invoiceNumber,
      customerId,
      billingPeriodStart: new Date(billingPeriod.year, billingPeriod.month - 1, 1),
      billingPeriodEnd: new Date(billingPeriod.year, billingPeriod.month, 0),
      subtotalCents: baseAmount,
      taxCents: taxAmount,
      totalCents: totalAmount,
      status: 'issued',
      issuedAt: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    }).returning();
    
    // Add invoice items
    await db.insert(invoiceItems).values([
      {
        invoiceId: invoice.id,
        description: 'EMS SaaS - ' + billingPeriod.monthName + ' ' + billingPeriod.year,
        quantity: 1,
        unit: 'month',
        unitPriceCents: baseAmount,
        totalPriceCents: baseAmount,
        taxPercent: 20,
        periodStart: new Date(billingPeriod.year, billingPeriod.month - 1, 1),
        periodEnd: new Date(billingPeriod.year, billingPeriod.month, 0),
      },
    ]);
    
    return invoice;
  });
  
  // Mark invoice as paid (webhook from payment provider)
  fastify.post('/webhook/payment', async (request: FastifyRequest, reply: FastifyReply) => {
    const { invoiceId, paymentStatus, transactionId } = request.body as any;
    
    if (paymentStatus === 'success') {
      await db.update(invoices)
        .set({ 
          status: 'paid',
          paidAt: new Date(),
        })
        .where(eq(invoices.id, invoiceId));
      
      return { success: true };
    }
    
    return { success: false };
  });
  
  // Get payment methods
  fastify.get('/payment-methods', async (request: FastifyRequest, reply: FastifyReply) => {
    // Return available payment methods
    return {
      methods: [
        { id: 'sepa', name: 'SEPA Lastschrift', description: 'Bank debit' },
        { id: 'credit_card', name: 'Kreditkarte', description: 'Visa, Mastercard' },
        { id: 'bank_transfer', name: 'Überweisung', description: 'Manual bank transfer' },
      ],
    };
  });
  
  // Setup payment method
  fastify.post('/payment-methods', async (request: FastifyRequest, reply: FastifyReply) => {
    const { methodType, details } = request.body as any;
    const customerId = (request as any).user?.customerId;
    
    // In production: integrate with payment provider (Stripe, etc.)
    // Store payment method securely
    
    return { 
      success: true, 
      message: 'Payment method added',
      methodId: 'pm_' + crypto.randomUUID(),
    };
  });
}

// Helper imports
import { eq, and, desc, count, sql } from 'drizzle-orm';
