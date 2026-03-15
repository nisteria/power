// Audit Log Service
import { db } from '../db/index.js';

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export async function createAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>) {
  return db.auditLogs.create({
    data: { ...log, id: crypto.randomUUID(), timestamp: new Date() },
  });
}

export async function getAuditLogs(filters: { userId?: string; resource?: string; from?: Date; to?: Date }) {
  return db.auditLogs.findMany({
    where: filters,
    orderBy: { timestamp: 'desc' },
    take: 100,
  });
}