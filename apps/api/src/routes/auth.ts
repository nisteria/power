import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '../db/index.js';
import { customers } from '../db/schema/customers.js';
import { createAccessToken } from '../utils/jwt.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
});

export async function authRoutes(fastify: FastifyInstance) {
  
  // Login
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = loginSchema.parse(request.body);
    
    const customer = await db.query.customers.findFirst({
      where: (customers, { eq }) => eq(customers.email, body.email),
    });
    
    if (!customer) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(body.password, customer.passwordHash);
    if (!validPassword) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    
    const accessToken = createAccessToken({ 
      customerId: customer.id, 
      email: customer.email 
    });
    
    return {
      accessToken,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      }
    };
  });
  
  // Register
  fastify.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = registerSchema.parse(request.body);
    
    // Check if email exists
    const existing = await db.query.customers.findFirst({
      where: (customers, { eq }) => eq(customers.email, body.email),
    });
    
    if (existing) {
      return reply.code(400).send({ error: 'Email already registered' });
    }
    
    const passwordHash = await bcrypt.hash(body.password, 10);
    
    const [customer] = await db.insert(customers).values({
      email: body.email,
      passwordHash,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      status: 'pending',
    }).returning();
    
    const accessToken = createAccessToken({ 
      customerId: customer.id, 
      email: customer.email 
    });
    
    return reply.code(201).send({
      accessToken,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      }
    });
  });
  
  // Refresh token
  fastify.post('/refresh', async (request: FastifyRequest, reply: FastifyReply) => {
    // Implement refresh token logic
    return { message: 'Not implemented yet' };
  });
}
