import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function healthRoutes(fastify: FastifyInstance) {
  // Detailed health check
  fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    };
  });

  // Readiness probe
  fastify.get('/health/ready', async (request: FastifyRequest, reply: FastifyReply) => {
    // Check database connection
    // Check Redis connection
    // Return 503 if not ready
    return { status: 'ready' };
  });

  // Liveness probe
  fastify.get('/health/live', async (request: FastifyRequest, reply: FastifyReply) => {
    return { status: 'alive' };
  });
}
