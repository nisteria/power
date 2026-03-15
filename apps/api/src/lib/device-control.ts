// Device Control Service
import { db } from '../db/index.js';

export interface DeviceCommand {
  id: string;
  deviceId: string;
  siteId: string;
  command: 'charge' | 'discharge' | 'charge_now' | 'discharge_now' | 'standby' | 'set_power';
  targetPowerKw?: number;
  targetSocPct?: number;
  issuedBy: string;
  issuedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'sent' | 'acknowledged' | 'failed' | 'expired';
  acknowledgmentAt?: Date;
  errorCode?: string;
  errorMessage?: string;
  traceId: string;
}

export interface CreateCommandInput {
  deviceId: string;
  siteId: string;
  command: DeviceCommand['command'];
  targetPowerKw?: number;
  targetSocPct?: number;
  issuedBy: string;
  commandTTL?: number; // seconds, default 300
}

const ACTIVE_COMMAND_WINDOW_MS = 24 * 60 * 60 * 1000; // 24h

export async function createDeviceCommand(input: CreateCommandInput): Promise<DeviceCommand> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + (input.commandTTL || 300) * 1000);

  // Check for conflicting active commands
  const activeCommand = await db.deviceCommands.findFirst({
    where: {
      deviceId: input.deviceId,
      status: { in: ['pending', 'sent', 'acknowledged'] },
      expiresAt: { gt: now },
    },
  });

  if (activeCommand) {
    throw new Error('CONFLICT: Device has an active command');
  }

  return db.deviceCommands.create({
    data: {
      id: crypto.randomUUID(),
      deviceId: input.deviceId,
      siteId: input.siteId,
      command: input.command,
      targetPowerKw: input.targetPowerKw,
      targetSocPct: input.targetSocPct,
      issuedBy: input.issuedBy,
      issuedAt: now,
      expiresAt,
      status: 'pending',
      traceId: crypto.randomUUID(),
    },
  });
}

export async function getCommandStatus(commandId: string): Promise<DeviceCommand | null> {
  return db.deviceCommands.findUnique({
    where: { id: commandId },
  });
}

export async function acknowledgeCommand(
  commandId: string,
  status: 'acknowledged' | 'failed',
  errorCode?: string,
  errorMessage?: string
): Promise<DeviceCommand> {
  return db.deviceCommands.update({
    where: { id: commandId },
    data: {
      status,
      acknowledgmentAt: new Date(),
      errorCode,
      errorMessage,
    },
  });
}

export async function getCommandHistory(
  deviceId: string,
  from?: Date,
  to?: Date
): Promise<DeviceCommand[]> {
  return db.deviceCommands.findMany({
    where: {
      deviceId,
      ...(from && { issuedAt: { gte: from } }),
      ...(to && { issuedAt: { lte: to } }),
    },
    orderBy: { issuedAt: 'desc' },
    take: 100,
  });
}

export async function getActiveCommands(siteId: string): Promise<DeviceCommand[]> {
  const now = new Date();
  
  return db.deviceCommands.findMany({
    where: {
      siteId,
      status: { in: ['pending', 'sent', 'acknowledged'] },
      expiresAt: { gt: now },
    },
    orderBy: { issuedAt: 'desc' },
  });
}

// Check for idempotent replay
export async function checkIdempotency(
  deviceId: string,
  command: DeviceCommand['command'],
  issuedAt: Date
): Promise<{ isDuplicate: boolean; existingCommand?: DeviceCommand }> {
  const windowStart = new Date(issuedAt.getTime() - ACTIVE_COMMAND_WINDOW_MS);
  
  const recentCommand = await db.deviceCommands.findFirst({
    where: {
      deviceId,
      command,
      issuedAt: { gte: windowStart },
    },
    orderBy: { issuedAt: 'desc' },
  });

  if (recentCommand) {
    return { isDuplicate: true, existingCommand: recentCommand };
  }

  return { isDuplicate: false };
}
