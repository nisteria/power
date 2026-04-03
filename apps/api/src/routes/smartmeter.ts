import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { smartMeters, consumptionData } from '../db/schema/smartmeters.js';

const authorizeSchema = z.object({
  netzbetreiberId: z.string().uuid(),
  meterId: z.string().min(10),
});

const consumptionQuerySchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  interval: z.enum(['15min', '1h', '1d']).optional(),
});

// Netzbetreiber OAuth URLs
const NETZBETREIBER_OAUTH = {
  'wiener-netze': 'https://iam.wienernetze.at/oauth/authorize',
  'ooe': 'https://iam.netzooee.at/oauth/authorize',
  'salzburg': 'https://iam.salzburgnetz.at/oauth/authorize',
};

export async function smartMeterRoutes(fastify: FastifyInstance) {
  
  // Authorize smart meter access
  fastify.post('/authorize', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = authorizeSchema.parse(request.body);
    
    // Generate OAuth URL based on netzbetreiber
    const netzbetreiberId = body.netzbetreiberId;
    const state = crypto.randomUUID();
    
    // Store authorization state
    // In production: save to database with expiration
    
    const oauthUrl = NETZBETREIBER_OAUTH['wiener-netze'] + 
      `?client_id=${process.env.WIENER_NETZE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(process.env.OAUTH_REDIRECT_URI || 'http://localhost:4000/smartmeter/callback')}` +
      `&response_type=code` +
      `&scope=consumption_data` +
      `&state=${state}`;
    
    return {
      authorizationUrl: oauthUrl,
      state,
      expiresIn: 600
    };
  });
  
  // OAuth callback
  fastify.get('/callback', async (request: FastifyRequest, reply: FastifyReply) => {
    const { code, state, error } = request.query as any;
    
    if (error) {
      return reply.redirect(`${process.env.FRONTEND_URL}/smartmeter/error?error=${error}`);
    }
    
    // Exchange code for token
    // In production: exchange code for access_token
    
    return reply.redirect(`${process.env.FRONTEND_URL}/smartmeter/success?state=${state}`);
  });
  
  // Get consumption data
  fastify.get('/:meterId/consumption', async (request: FastifyRequest, reply: FastifyReply) => {
    const { meterId } = request.params as { meterId: string };
    const { dateFrom, dateTo, interval = '1h' } = consumptionQuerySchema.parse(request.query);
    
    // Query consumption data
    const data = await db.query.consumptionData.findMany({
      where: (consumption, { and, eq, gte, lte }) => 
        and(
          eq(consumption.smartMeterId, meterId),
          gte(consumption.timestamp, new Date(dateFrom)),
          lte(consumption.timestamp, new Date(dateTo))
        ),
      orderBy: (consumption, { asc }) => [asc(consumption.timestamp)],
      limit: 1000,
    });
    
    // Aggregate based on interval
    const aggregated = aggregateConsumption(data, interval);
    
    return {
      meterId,
      netzbetreiber: 'Wiener Netze',
      data: aggregated,
      totalKwh: data.reduce((sum, d) => sum + Number(d.consumptionKwh), 0),
    };
  });
  
  // Get real-time data
  fastify.get('/:meterId/realtime', async (request: FastifyRequest, reply: FastifyReply) => {
    const { meterId } = request.params as { meterId: string };
    
    // Get latest reading
    const latest = await db.query.consumptionData.findMany({
      where: (consumption, { eq }) => eq(consumption.smartMeterId, meterId),
      orderBy: (consumption, { desc }) => [desc(consumption.timestamp)],
      limit: 1,
    });
    
    if (latest.length === 0) {
      return reply.code(404).send({ error: 'No data available' });
    }
    
    const reading = latest[0];
    return {
      meterId,
      timestamp: reading.timestamp,
      currentPowerKw: reading.powerKw,
      last15MinKwh: reading.consumptionKwh,
      voltage: reading.voltage,
      currentAmps: reading.currentAmps,
      powerFactor: reading.powerFactor,
    };
  });
  
  // Get consumption history
  fastify.get('/:meterId/history', async (request: FastifyRequest, reply: FastifyReply) => {
    const { meterId } = request.params as { meterId: string };
    const months = parseInt((request.query as any).months || '3');
    
    const dateFrom = new Date();
    dateFrom.setMonth(dateFrom.getMonth() - months);
    
    const data = await db.query.consumptionData.findMany({
      where: (consumption, { and, eq, gte }) => 
        and(
          eq(consumption.smartMeterId, meterId),
          gte(consumption.timestamp, dateFrom)
        ),
    });
    
    // Calculate daily totals
    const dailyMap = new Map();
    for (const reading of data) {
      const date = reading.timestamp.toISOString().split('T')[0];
      const existing = dailyMap.get(date) || { total: 0, peak: 0, count: 0 };
      existing.total += Number(reading.consumptionKwh);
      existing.peak = Math.max(existing.peak, Number(reading.powerKw || 0));
      existing.count++;
      dailyMap.set(date, existing);
    }
    
    const dailyTotals = Array.from(dailyMap.entries()).map(([date, stats]) => ({
      date,
      totalKwh: Math.round(stats.total * 1000) / 1000,
      avgPowerKw: Math.round((stats.total / (stats.count * 4)) * 1000) / 1000,
      peakPowerKw: Math.round(stats.peak * 1000) / 1000,
    }));
    
    return {
      meterId,
      period: { from: dateFrom.toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] },
      dailyTotals,
      totalKwh: Array.from(dailyMap.values()).reduce((sum, d) => sum + d.total, 0),
    };
  });
}

// Helper function to aggregate consumption data
function aggregateConsumption(data: any[], interval: string) {
  // Implementation depends on interval parameter
  return data.map(d => ({
    timestamp: d.timestamp,
    consumptionKwh: d.consumptionKwh,
    powerKw: d.powerKw,
    quality: d.quality,
  }));
}
