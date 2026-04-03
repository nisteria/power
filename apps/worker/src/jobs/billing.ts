// Billing Worker - Invoice Generation
import { db } from '../lib/db.js';
import { logger } from '../lib/logger.js';
import { sendInvoiceEmail } from './email.js';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vat: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  siteId: string;
  invoiceNumber: string;
  periodFrom: Date;
  periodTo: Date;
  items: InvoiceItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: Date;
  dueDate: Date;
}

export async function runBillingJob(): Promise<void> {
  logger.info('Starting billing job');

  try {
    // Get all active customers with sites
    const customers = await db.customers.findMany({
      where: { status: 'active' },
      include: {
        sites: {
          where: { status: 'active' },
        },
      },
    });

    for (const customer of customers) {
      for (const site of customer.sites) {
        await generateInvoice(customer.id, site.id);
      }
    }

    logger.info('Billing job completed');
  } catch (error) {
    logger.error('Billing job failed', { error });
    throw error;
  }
}

async function generateInvoice(customerId: string, siteId: string): Promise<Invoice> {
  const periodFrom = new Date();
  periodFrom.setDate(1); // First of month
  periodFrom.setHours(0, 0, 0, 0);

  const periodTo = new Date();
  periodTo.setHours(23, 59, 59, 999);

  // Get consumption data
  const consumption = await getConsumption(siteId, periodFrom, periodTo);
  
  // Calculate fees
  const baseFee = 9.90; // EUR/month
  const consumptionFee = consumption.kwh * consumption.ratePerKwh;
  const optimizationFee = consumption.savings > 0 ? consumption.savings * 0.3 : 0;

  const subtotal = baseFee + consumptionFee + optimizationFee;
  const vat = subtotal * 0.20; // 20% Austrian VAT
  const total = subtotal + vat;

  const invoice: Invoice = {
    id: crypto.randomUUID(),
    customerId,
    siteId,
    invoiceNumber: generateInvoiceNumber(),
    periodFrom,
    periodTo,
    items: [
      {
        description: 'Grundgebühr',
        quantity: 1,
        unitPrice: baseFee,
        totalPrice: baseFee,
        vat: baseFee * 0.2,
      },
      {
        description: `Stromverbrauch ${consumption.kwh.toFixed(2)} kWh`,
        quantity: consumption.kwh,
        unitPrice: consumption.ratePerKwh,
        totalPrice: consumptionFee,
        vat: consumptionFee * 0.2,
      },
    ],
    subtotal,
    vat,
    total,
    status: 'draft',
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
  };

  // Save to database
  await db.invoices.create({
    data: {
      id: invoice.id,
      customerId: invoice.customerId,
      siteId: invoice.siteId,
      invoiceNumber: invoice.invoiceNumber,
      periodFrom: invoice.periodFrom,
      periodTo: invoice.periodTo,
      subtotal: invoice.subtotal,
      vat: invoice.vat,
      total: invoice.total,
      status: invoice.status,
      dueDate: invoice.dueDate,
    },
  });

  // Send invoice email
  await sendInvoiceEmail(customerId, invoice);

  return invoice;
}

function generateInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV-${year}-${random}`;
}

async function getConsumption(
  siteId: string,
  from: Date,
  to: Date
): Promise<{ kwh: number; ratePerKwh: number; savings: number }> {
  // Aggregate consumption from smart meter data
  const readings = await db.smartMeterReadings.aggregate({
    where: {
      siteId,
      timestamp: { gte: from, lte: to },
    },
    _sum: {
      energyImportKwh: true,
    },
  });

  const kwh = readings._sum.energyImportKwh || 0;
  const ratePerKwh = 0.28; // EUR/kWh average
  
  // Calculate optimization savings (mock)
  const savings = kwh * 0.05; // 5% savings from optimization

  return { kwh, ratePerKwh, savings };
}

// Cron schedule: 1st of month at 9:00
export const CRON_SCHEDULE = '0 9 1 * *';

// Run manually for testing
runBillingJob()
  .then(() => process.exit(0))
  .catch((err) => {
    logger.error('Fatal error', { error: err });
    process.exit(1);
  });
