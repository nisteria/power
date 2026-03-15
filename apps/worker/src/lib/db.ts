// Database Client - Prisma/PostgreSQL
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Export all models for convenience
export * from '@prisma/client';

// Test connection
db.$connect()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed', err));

export default db;
