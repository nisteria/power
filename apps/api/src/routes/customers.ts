// Customers Routes
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { customers, addresses } from '../db/schema/customers.js';

const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
});

export async function customersRoutes(fastify: FastifyInstance) {
  
  // Get current customer profile
  fastify.get('/me', async (request: FastifyRequest, reply: FastifyReply) => {
    const customerId = (request as any).user?.customerId;
    
    const customer = await db.query.customers.findFirst({
      where: (customers, { eq }) => eq(customers.id, customerId),
    });
    
    if (!customer) {
      return reply.code(404).send({ error: 'Customer not found' });
    }
    
    // Get address
    const address = await db.query.addresses.findFirst({
      where: (addresses, { eq }) => eq(addresses.customerId, customerId),
    });
    
    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      companyName: customer.companyName,
      status: customer.status,
      customerType: customer.customerType,
      address: address ? {
        street: address.street,
        houseNumber: address.houseNumber,
        door: address.door,
        postalCode: address.postalCode,
        city: address.city,
        country: address.country,
      } : null,
      createdAt: customer.createdAt,
      lastLoginAt: customer.lastLoginAt,
    };
  });
  
  // Update profile
  fastify.patch('/me', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = updateProfileSchema.parse(request.body);
    const customerId = (request as any).user?.customerId;
    
    const [updated] = await db.update(customers)
      .set({ ...body, updatedAt: new Date() })
      .where((customers, { eq }) => eq(customers.id, customerId))
      .returning();
    
    return updated;
  });
  
  // Update address
  fastify.patch('/me/address', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as any;
    const customerId = (request as any).user?.customerId;
    
    // Check if address exists
    const existing = await db.query.addresses.findFirst({
      where: (addresses, { eq }) => eq(addresses.customerId, customerId),
    });
    
    if (existing) {
      // Update
      const [updated] = await db.update(addresses)
        .set({
          street: body.street,
          houseNumber: body.houseNumber,
          door: body.door,
          postalCode: body.postalCode,
          city: body.city,
          country: body.country || 'AT',
        })
        .where((addresses, { eq }) => eq(addresses.id, existing.id))
        .returning();
      
      return updated;
    } else {
      // Create
      const [created] = await db.insert(addresses)
        .values({
          customerId,
          street: body.street,
          houseNumber: body.houseNumber,
          door: body.door,
          postalCode: body.postalCode,
          city: body.city,
          country: body.country || 'AT',
        })
        .returning();
      
      return created;
    }
  });
  
  // Get customer devices
  fastify.get('/me/devices', async (request: FastifyRequest, reply: FastifyReply) => {
    const customerId = (request as any).user?.customerId;
    
    const customerDevices = await db.query.devices.findMany({
      where: (devices, { eq }) => eq(devices.customerId, customerId),
    });
    
    return { devices: customerDevices };
  });
  
  // Get customer tariffs
  fastify.get('/me/tariffs', async (request: FastifyRequest, reply: FastifyReply) => {
    const customerId = (request as any).user?.customerId;
    
    const customerTariffs = await db.query.customerTariffs.findMany({
      where: (ct, { eq }) => eq(ct.customerId, customerId),
      with: {
        tariff: true,
      },
    });
    
    return { tariffs: customerTariffs };
  });
  
  // Get billing history
  fastify.get('/me/billing', async (request: FastifyRequest, reply: FastifyReply) => {
    const customerId = (request as any).user?.customerId;
    
    const invoiceList = await db.query.invoices.findMany({
      where: (invoices, { eq }) => eq(invoices.customerId, customerId),
      orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
      limit: 12,
    });
    
    // Calculate totals
    const totalPaid = invoiceList
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.totalCents, 0) / 100;
    
    const totalOpen = invoiceList
      .filter(inv => inv.status === 'issued')
      .reduce((sum, inv) => sum + inv.totalCents, 0) / 100;
    
    return {
      invoices: invoiceList,
      summary: {
        totalPaid: totalPaid.toFixed(2),
        totalOpen: totalOpen.toFixed(2),
        currency: 'EUR',
      },
    };
  });
}
