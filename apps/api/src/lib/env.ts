// Environment Schema - Validation
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  
  DATABASE_URL: z.string().url(),
  DATABASE_POOL_SIZE: z.coerce.number().default(20),
  
  REDIS_URL: z.string().url(),
  REDIS_MAX_MEMORY: z.string().default('256mb'),
  
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRY: z.string().default('24h'),
  
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  
  EPEX_API_KEY: z.string().optional(),
  
  WIENER_NETZE_CLIENT_ID: z.string().optional(),
  WIENER_NETZE_CLIENT_SECRET: z.string().optional(),
  OAUTH_REDIRECT_URI: z.string().url().optional(),
  
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  
  STRIPE_API_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  PROMETHEUS_ENABLED: z.boolean().default(false),
  GRAFANA_PASSWORD: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;
