// API Validation Schemas - Zod
import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben'),
});

export const registerSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben')
    .regex(/[A-Z]/, 'Mindestens ein Großbuchstabe erforderlich')
    .regex(/[0-9]/, 'Mindestens eine Zahl erforderlich'),
  firstName: z.string().min(1, 'Vorname ist erforderlich'),
  lastName: z.string().min(1, 'Nachname ist erforderlich'),
  phone: z.string().optional(),
});

// Customer Schemas
export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
});

export const addressSchema = z.object({
  street: z.string().min(1, 'Straße ist erforderlich'),
  houseNumber: z.string().min(1, 'Hausnummer ist erforderlich'),
  door: z.string().optional(),
  postalCode: z.string().min(4, 'PLZ ist erforderlich'),
  city: z.string().min(1, 'Stadt ist erforderlich'),
  country: z.string().length(2, 'Ländercode muss 2 Zeichen sein').default('AT'),
});

// Smart Meter Schemas
export const authorizeMeterSchema = z.object({
  netzbetreiberId: z.string().uuid('Ungültige Netzbetreiber-ID'),
  meterId: z.string().min(10, 'Zähler-ID muss mindestens 10 Zeichen haben'),
});

export const consumptionQuerySchema = z.object({
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Datum muss im Format YYYY-MM-DD sein'),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Datum muss im Format YYYY-MM-DD sein'),
  interval: z.enum(['15min', '1h', '1d']).default('1h'),
});

// Device Schemas
export const deviceConfigSchema = z.object({
  minSocPercent: z.number().min(0).max(100).optional(),
  maxSocPercent: z.number().min(0).max(100).optional(),
  chargePriority: z.enum(['solar_first', 'grid_first', 'battery_first']).optional(),
  maxChargeRate: z.number().min(0).optional(),
  maxDischargeRate: z.number().min(0).optional(),
});

export const deviceScheduleSchema = z.object({
  type: z.enum(['charge', 'discharge', 'maintain', 'optimize', 'manual']),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  targetValue: z.number().optional(),
  priority: z.number().min(1).max(10).default(5),
});

// Optimization Schemas
export const optimizationSchema = z.object({
  jobType: z.enum(['schedule_optimization', 'tariff_selection', 'peak_shaving', 'forecast']),
  parameters: z.object({
    horizonHours: z.number().min(1).max(168).optional(),
    optimizeCost: z.boolean().optional(),
    optimizeSelfConsumption: z.boolean().optional(),
  }).optional(),
});

// Billing Schemas
export const paymentMethodSchema = z.object({
  methodType: z.enum(['sepa', 'credit_card', 'bank_transfer']),
  details: z.record(z.any()),
});

// Webhook Schemas
export const webhookSchema = z.object({
  url: z.string().url('Ungültige URL'),
  events: z.array(z.string()).min(1, 'Mindestens ein Event ist erforderlich'),
  secret: z.string().optional(),
});

// Alert Rule Schemas
export const alertRuleSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  type: z.enum(['price', 'consumption', 'device', 'system']),
  condition: z.string().min(1, 'Bedingung ist erforderlich'),
  threshold: z.number(),
  unit: z.string(),
  enabled: z.boolean().default(true),
  notifyEmail: z.boolean().default(true),
  notifyPush: z.boolean().default(true),
});

// Helper function to validate and return errors
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}
