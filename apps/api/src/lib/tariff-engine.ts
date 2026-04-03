// Day-Ahead Tariff Engine Service
import { db } from '../db/index.js';

export interface TariffSlot {
  id: string;
  siteId: string;
  startTime: Date;
  endTime: Date;
  priceEurPerKwh: number;
  source: 'day-ahead' | 'manual' | 'forecast';
  createdAt: Date;
}

export interface CreateTariffSlotInput {
  siteId: string;
  startTime: Date;
  endTime: Date;
  priceEurPerKwh: number;
  source?: 'day-ahead' | 'manual' | 'forecast';
}

export async function createTariffSlot(input: CreateTariffSlotInput): Promise<TariffSlot> {
  // Validate time range
  if (input.startTime >= input.endTime) {
    throw new Error('startTime must be before endTime');
  }

  // Validate price
  if (input.priceEurPerKwh < 0 || input.priceEurPerKwh > 5) {
    throw new Error('priceEurPerKwh must be between 0 and 5 EUR');
  }

  return db.tariffSlots.create({
    data: {
      id: crypto.randomUUID(),
      ...input,
      source: input.source || 'manual',
      createdAt: new Date(),
    },
  });
}

export async function getTariffSlots(filters: {
  siteId: string;
  from?: Date;
  to?: Date;
}): Promise<TariffSlot[]> {
  return db.tariffSlots.findMany({
    where: {
      siteId: filters.siteId,
      ...(filters.from && { startTime: { gte: filters.from } }),
      ...(filters.to && { endTime: { lte: filters.to } }),
    },
    orderBy: { startTime: 'asc' },
  });
}

export async function getCurrentTariff(siteId: string): Promise<TariffSlot | null> {
  const now = new Date();
  
  return db.tariffSlots.findFirst({
    where: {
      siteId,
      startTime: { lte: now },
      endTime: { gte: now },
    },
    orderBy: { startTime: 'desc' },
  });
}

export async function getOptimalChargeSlots(
  siteId: string,
  targetKwh: number,
  preferredStart: Date,
  preferredEnd: Date
): Promise<{ slot: TariffSlot; kwhToCharge: number }[]> {
  const slots = await getTariffSlots({
    siteId,
    from: preferredStart,
    to: preferredEnd,
  });

  // Sort by price ascending (cheapest first)
  const sortedSlots = slots
    .filter((s) => s.priceEurPerKwh > 0)
    .sort((a, b) => a.priceEurPerKwh - b.priceEurPerKwh);

  const result: { slot: TariffSlot; kwhToCharge: number }[] = [];
  let remainingKwh = targetKwh;

  for (const slot of sortedSlots) {
    if (remainingKwh <= 0) break;

    const durationHours =
      (new Date(slot.endTime).getTime() - new Date(slot.startTime).getTime()) /
      (1000 * 60 * 60);
    const maxKwhInSlot = durationHours * 11; // Assume 11kW max charge rate
    const kwhToCharge = Math.min(remainingKwh, maxKwhInSlot);

    result.push({ slot, kwhToCharge });
    remainingKwh -= kwhToCharge;
  }

  return result;
}

export async function bulkCreateDayAheadTariffs(
  siteId: string,
  tariffs: { startTime: Date; endTime: Date; priceEurPerKwh: number }[]
): Promise<TariffSlot[]> {
  const results: TariffSlot[] = [];

  for (const tariff of tariffs) {
    const slot = await createTariffSlot({
      siteId,
      ...tariff,
      source: 'day-ahead',
    });
    results.push(slot);
  }

  return results;
}
