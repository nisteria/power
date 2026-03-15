import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { customersRoutes } from './routes/customers.js';
import { authRoutes } from './routes/auth.js';
import { smartMeterRoutes } from './routes/smartmeter.js';
import { deviceRoutes } from './routes/devices.js';
import { optimizationRoutes } from './routes/optimization.js';
import { billingRoutes } from './routes/billing.js';
import { healthRoutes } from './routes/health.js';
import { errorHandler } from './middleware/error.js';
import { logger } from './utils/logger.js';

const fastify = Fastify({
  logger: logger,
});

// Register plugins
await fastify.register(helmet, {
  contentSecurityPolicy: false,
});

await fastify.register(cors, {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
});

await fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
});

await fastify.register(swagger, {
  openapi: {
    info: {
      title: 'Power Energy API',
      description: 'API for Power Energy Orchestrator',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

await fastify.register(swaggerUi, {
  routePrefix: '/docs',
});

// Error handler
fastify.setErrorHandler(errorHandler);

// Register routes
await fastify.register(healthRoutes, { prefix: '/health' });
await fastify.register(authRoutes, { prefix: '/auth' });
await fastify.register(customersRoutes, { prefix: '/customers' });
await fastify.register(smartMeterRoutes, { prefix: '/smartmeter' });
await fastify.register(deviceRoutes, { prefix: '/devices' });
await fastify.register(optimizationRoutes, { prefix: '/optimization' });
await fastify.register(billingRoutes, { prefix: '/billing' });

// Health check
fastify.get('/health', async () => {
  return { 
    status: 'healthy', 
    version: '1.0.0',
    timestamp: new Date().toISOString() 
  };
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '4000', 10);
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on http://0.0.0.0:${port}`);
    console.log(`Swagger UI: http://localhost:${port}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export { fastify };
