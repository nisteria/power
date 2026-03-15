// Optimization Routes - Fastify Plugin
import { FastifyInstance } from 'fastify';
import { runOptimization, calculateArbitrageOpportunity } from '../lib/optimization-engine.js';

export async function optimizationRoutes(fastify: FastifyInstance) {
  // POST /api/v1/sites/:siteId/optimize - Run optimization
  fastify.post<{
    Params: { siteId: string };
    Body: { force?: boolean };
  }>('/sites/:siteId/optimize', {
    preHandler: fastify.authenticate,
    schema: {
      params: {
        type: 'object',
        properties: {
          siteId: { type: 'string' },
        },
        required: ['siteId'],
      },
    },
  }, async (request, reply) => {
    const { siteId } = request.params;
    
    try {
      const recommendations = await runOptimization(siteId);
      
      return reply.send({
        siteId,
        timestamp: new Date().toISOString(),
        recommendations,
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: 'optimization_failed',
        message: 'Failed to run optimization',
      });
    }
  });

  // GET /api/v1/sites/:siteId/optimize/arbitrage - Calculate arbitrage
  fastify.get<{
    Params: { siteId: string };
  }>('/sites/:siteId/optimize/arbitrage', {
    preHandler: fastify.authenticate,
    schema: {
      params: {
        type: 'object',
        properties: {
          siteId: { type: 'string' },
        },
        required: ['siteId'],
      },
    },
  }, async (request, reply) => {
    const { siteId } = request.params;
    
    try {
      const arbitrage = await calculateArbitrageOpportunity(siteId);
      
      return reply.send({
        siteId,
        timestamp: new Date().toISOString(),
        ...arbitrage,
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: 'arbitrage_calculation_failed',
        message: 'Failed to calculate arbitrage opportunity',
      });
    }
  });

  // GET /api/v1/sites/:siteId/optimize/recommendations - Get current recommendations
  fastify.get<{
    Params: { siteId: string };
    Querystring: { deviceId?: string };
  }>('/sites/:siteId/optimize/recommendations', {
    preHandler: fastify.authenticate,
    schema: {
      params: {
        type: 'object',
        properties: {
          siteId: { type: 'string' },
        },
        required: ['siteId'],
      },
      querystring: {
        type: 'object',
        properties: {
          deviceId: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    const { siteId } = request.params;
    const { deviceId } = request.query;
    
    try {
      const recommendations = await runOptimization(siteId);
      
      // Filter by device if specified
      const filtered = deviceId 
        ? recommendations.filter(r => r.deviceId === deviceId)
        : recommendations;
      
      return reply.send({
        siteId,
        timestamp: new Date().toISOString(),
        recommendations: filtered,
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: 'recommendations_failed',
        message: 'Failed to get recommendations',
      });
    }
  });

  // POST /api/v1/sites/:siteId/optimize/scenario - Create optimization scenario
  fastify.post<{
    Params: { siteId: string };
    Body: { scenarioType: 'charge' | 'discharge' | 'hold' | 'arbitrage'; targetKwh?: number };
  }>('/sites/:siteId/optimize/scenario', {
    preHandler: fastify.authenticate,
    schema: {
      params: {
        type: 'object',
        properties: {
          siteId: { type: 'string' },
        },
        required: ['siteId'],
      },
      body: {
        type: 'object',
        properties: {
          scenarioType: { type: 'string', enum: ['charge', 'discharge', 'hold', 'arbitrage'] },
          targetKwh: { type: 'number' },
        },
        required: ['scenarioType'],
      },
    },
  }, async (request, reply) => {
    const { siteId } = request.params;
    const { scenarioType, targetKwh } = request.body;
    
    try {
      const scenario = await fastify.db.optimizationScenarios.create({
        data: {
          id: crypto.randomUUID(),
          siteId,
          scenarioType,
          targetKwh,
          expectedSavings: 0,
          confidence: 0.85,
          createdAt: new Date(),
        },
      });
      
      return reply.status(201).send({
        scenarioId: scenario.id,
        siteId,
        scenarioType,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        error: 'scenario_creation_failed',
        message: 'Failed to create optimization scenario',
      });
    }
  });
}

export default optimizationRoutes;
