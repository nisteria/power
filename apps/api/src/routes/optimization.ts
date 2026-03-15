// Optimization Routes
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { optimizationJobs, optimizationRecommendations } from '../db/schema/optimization.js';

const runOptimizationSchema = z.object({
  jobType: z.enum(['schedule_optimization', 'tariff_selection', 'peak_shaving', 'forecast']),
  parameters: z.object({
    horizonHours: z.number().optional(),
    optimizeCost: z.boolean().optional(),
    optimizeSelfConsumption: z.boolean().optional(),
  }).optional(),
});

export async function optimizationRoutes(fastify: FastifyInstance) {
  
  // Get recommendations
  fastify.get('/recommendations', async (request: FastifyRequest, reply: FastifyReply) => {
    const customerId = (request as any).user?.customerId;
    
    const recommendations = await db.query.optimizationRecommendations.findMany({
      where: (rec, { eq }) => eq(rec.customerId, customerId),
      orderBy: (rec, { desc }) => [desc(rec.priority)],
    });
    
    return { recommendations };
  });
  
  // Run optimization
  fastify.post('/run', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = runOptimizationSchema.parse(request.body);
    const customerId = (request as any).user?.customerId;
    
    // Create optimization job
    const [job] = await db.insert(optimizationJobs).values({
      customerId,
      jobType: body.jobType,
      parameters: body.parameters || {},
      status: 'running',
      startedAt: new Date(),
    }).returning();
    
    // In production: queue job to worker
    // For now: run synchronously
    
    try {
      // Run optimization logic based on type
      let result;
      
      switch (body.jobType) {
        case 'schedule_optimization':
          result = await runScheduleOptimization(customerId, body.parameters);
          break;
        case 'tariff_selection':
          result = await runTariffSelection(customerId);
          break;
        case 'peak_shaving':
          result = await runPeakShaving(customerId);
          break;
        default:
          result = { message: 'Optimization type not implemented' };
      }
      
      // Update job status
      await db.update(optimizationJobs)
        .set({ 
          status: 'completed', 
          result,
          completedAt: new Date() 
        })
        .where((jobs, { eq }) => eq(jobs.id, job.id));
      
      return { jobId: job.id, status: 'completed', result };
      
    } catch (error) {
      await db.update(optimizationJobs)
        .set({ 
          status: 'failed',
          errorMessage: String(error),
          completedAt: new Date()
        })
        .where((jobs, { eq }) => eq(jobs.id, job.id));
      
      return reply.code(500).send({ error: String(error) });
    }
  });
  
  // Get optimization jobs
  fastify.get('/jobs', async (request: FastifyRequest, reply: FastifyReply) => {
    const customerId = (request as any).user?.customerId;
    
    const jobs = await db.query.optimizationJobs.findMany({
      where: (jobs, { eq }) => eq(jobs.customerId, customerId),
      orderBy: (jobs, { desc }) => [desc(jobs.createdAt)],
      limit: 20,
    });
    
    return { jobs };
  });
  
  // Accept recommendation
  fastify.post('/recommendations/:id/accept', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const customerId = (request as any).user?.customerId;
    
    await db.update(optimizationRecommendations)
      .set({ status: 'accepted', updatedAt: new Date() })
      .where((rec, { and, eq }) => and(
        eq(rec.id, id),
        eq(rec.customerId, customerId)
      ));
    
    return { success: true };
  });
}

// Optimization functions
async function runScheduleOptimization(customerId: string, params: any) {
  // Load customer devices
  // Load consumption data
  // Run optimization algorithm
  // Return schedules
  
  const horizonHours = params?.horizonHours || 24;
  
  return {
    schedules: [
      {
        deviceId: 'sample-battery',
        type: 'charge',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        targetValue: 90,
        estimatedSavings: 2.50,
      }
    ],
    estimatedSavingsMonthly: 18.50,
    newSelfConsumptionPercent: 85,
  };
}

async function runTariffSelection(customerId: string) {
  // Analyze available tariffs
  // Compare with current usage
  // Return recommendation
  
  return {
    currentTariff: 'Wiener Netze Fix',
    recommendedTariff: 'Wiener Netze Dynamic',
    savingsMonthly: 15.00,
    paybackMonths: 0,
  };
}

async function runPeakShaving(customerId: string) {
  // Analyze consumption peaks
  // Identify optimization opportunities
  // Return plan
  
  return {
    currentPeakKw: 12.5,
    optimizedPeakKw: 8.2,
    savingsMonthly: 45.00,
    actions: [
      { type: 'shift_load', description: 'Move washing machine to night', savings: 15 },
      { type: 'battery_discharge', description: 'Discharge battery during peak', savings: 25 },
      { type: 'pv_optimization', description: 'Maximize PV self-consumption', savings: 5 },
    ],
  };
}
