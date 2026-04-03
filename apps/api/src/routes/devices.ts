import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { devices, deviceStates, deviceSchedules } from '../db/schema/devices.js';

const deviceConfigSchema = z.object({
  minSocPercent: z.number().min(0).max(100).optional(),
  maxSocPercent: z.number().min(0).max(100).optional(),
  chargePriority: z.enum(['solar_first', 'grid_first', 'battery_first']).optional(),
});

const scheduleSchema = z.object({
  type: z.enum(['charge', 'discharge', 'maintain', 'optimize', 'manual']),
  startTime: z.string(),
  endTime: z.string().optional(),
  targetValue: z.number().optional(),
  priority: z.number().min(1).max(10).optional(),
});

export async function deviceRoutes(fastify: FastifyInstance) {
  
  // List all devices for customer
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    // In production: get customerId from JWT
    const customerId = (request as any).user?.customerId;
    
    const customerDevices = await db.query.devices.findMany({
      where: (devices, { eq }) => eq(devices.customerId, customerId),
    });
    
    // Get current state for each device
    const devicesWithState = await Promise.all(
      customerDevices.map(async (device) => {
        const latestState = await db.query.deviceStates.findFirst({
          where: (deviceStates, { eq }) => eq(deviceStates.deviceId, device.id),
          orderBy: (deviceStates, { desc }) => [desc(deviceStates.timestamp)],
        });
        return { ...device, currentState: latestState };
      })
    );
    
    return { devices: devicesWithState };
  });
  
  // Get device details
  fastify.get('/:deviceId', async (request: FastifyRequest, reply: FastifyReply) => {
    const { deviceId } = request.params as { deviceId: string };
    const customerId = (request as any).user?.customerId;
    
    const device = await db.query.devices.findFirst({
      where: (devices, { and, eq }) => and(
        eq(devices.id, deviceId),
        eq(devices.customerId, customerId)
      ),
    });
    
    if (!device) {
      return reply.code(404).send({ error: 'Device not found' });
    }
    
    // Get current state
    const latestState = await db.query.deviceStates.findFirst({
      where: (deviceStates, { eq }) => eq(deviceStates.deviceId, deviceId),
      orderBy: (deviceStates, { desc }) => [desc(deviceStates.timestamp)],
    });
    
    return { ...device, currentState: latestState };
  });
  
  // Update device config
  fastify.patch('/:deviceId/config', async (request: FastifyRequest, reply: FastifyReply) => {
    const { deviceId } = request.params as { deviceId: string };
    const body = deviceConfigSchema.parse(request.body);
    const customerId = (request as any).user?.customerId;
    
    // Verify ownership
    const device = await db.query.devices.findFirst({
      where: (devices, { and, eq }) => and(
        eq(devices.id, deviceId),
        eq(devices.customerId, customerId)
      ),
    });
    
    if (!device) {
      return reply.code(404).send({ error: 'Device not found' });
    }
    
    // Update config
    const currentConfig = device.config as any || {};
    const newConfig = { ...currentConfig, ...body };
    
    await db.update(devices)
      .set({ config: newConfig, updatedAt: new Date() })
      .where((devices, { eq }) => eq(devices.id, deviceId));
    
    return { success: true, config: newConfig };
  });
  
  // Get device schedule
  fastify.get('/:deviceId/schedule', async (request: FastifyRequest, reply: FastifyReply) => {
    const { deviceId } = request.params as { deviceId: string };
    const customerId = (request as any).user?.customerId;
    
    // Verify ownership
    const device = await db.query.devices.findFirst({
      where: (devices, { and, eq }) => and(
        eq(devices.id, deviceId),
        eq(devices.customerId, customerId)
      ),
    });
    
    if (!device) {
      return reply.code(404).send({ error: 'Device not found' });
    }
    
    const schedules = await db.query.deviceSchedules.findMany({
      where: (deviceSchedules, { eq }) => eq(deviceSchedules.deviceId, deviceId),
      orderBy: (deviceSchedules, { asc }) => [asc(deviceSchedules.startTime)],
    });
    
    return { deviceId, schedules };
  });
  
  // Create device schedule
  fastify.post('/:deviceId/schedule', async (request: FastifyRequest, reply: FastifyReply) => {
    const { deviceId } = request.params as { deviceId: string };
    const body = scheduleSchema.parse(request.body);
    const customerId = (request as any).user?.customerId;
    
    // Verify ownership
    const device = await db.query.devices.findFirst({
      where: (devices, { and, eq }) => and(
        eq(devices.id, deviceId),
        eq(devices.customerId, customerId)
      ),
    });
    
    if (!device) {
      return reply.code(404).send({ error: 'Device not found' });
    }
    
    const [schedule] = await db.insert(deviceSchedules).values({
      deviceId,
      scheduleType: body.type,
      startTime: new Date(body.startTime),
      endTime: body.endTime ? new Date(body.endTime) : null,
      targetValue: body.targetValue,
      priority: body.priority || 5,
      status: 'pending',
    }).returning();
    
    return reply.code(201).send(schedule);
  });
  
  // Delete schedule
  fastify.delete('/:deviceId/schedule/:scheduleId', async (request: FastifyRequest, reply: FastifyReply) => {
    const { deviceId, scheduleId } = request.params as { deviceId: string; scheduleId: string };
    const customerId = (request as any).user?.customerId;
    
    await db.delete(deviceSchedules)
      .where((deviceSchedules, { and, eq }) => and(
        eq(deviceSchedules.id, scheduleId),
        eq(deviceSchedules.deviceId, deviceId)
      ));
    
    return { success: true };
  });
}
