/**
 * QA Test Cases for Tarif-Engine (Day-Ahead)
 * TC-34..TC-38 based on API_SPEC.md Tarif-Engine Slice
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../src/index.js';

const BASE_URL = '/api/v1';

describe('Tarif-Engine API Integration Tests', () => {
  const testSiteId = 'test-site-tariff-001';

  describe('TC-34: POST /sites/:siteId/tariffs - Valid Tariff Profile', () => {
    it('should accept valid tariff slots', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/tariffs`)
        .send({
          slots: [
            {
              startTime: '2026-03-16T00:00:00Z',
              endTime: '2026-03-16T01:00:00Z',
              priceEurPerKwh: 0.12,
            },
            {
              startTime: '2026-03-16T01:00:00Z',
              endTime: '2026-03-16T02:00:00Z',
              priceEurPerKwh: 0.08,
            },
          ],
        });

      expect(response.status).toBe(201);
      expect(response.body.created).toBe(2);
    });
  });

  describe('TC-35: TC-35: POST /sites/:siteId/tariffs - Invalid Time Coverage (422)', () => {
    it('should reject tariff with invalid time coverage', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/tariffs`)
        .send({
          slots: [
            {
              startTime: '2026-03-16T02:00:00Z',
              endTime: '2026-03-16T01:00:00Z', // Before start
              priceEurPerKwh: 0.10,
            },
          ],
        });

      expect(response.status).toBe(422);
      expect(response.body.error).toContain('invalid_slot_coverage');
    });
  });

  describe('TC-36: TC-36: POST /sites/:siteId/tariffs - Version Conflict (409)', () => {
    it('should reject tariff update with stale version', async () => {
      // Create initial tariff
      await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/tariffs`)
        .send({
          slots: [
            {
              startTime: '2026-03-16T00:00:00Z',
              endTime: '2026-03-16T01:00:00Z',
              priceEurPerKwh: 0.10,
            },
          ],
        });

      // Try to update with stale version
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/tariffs`)
        .send({
          slots: [
            {
              startTime: '2026-03-16T00:00:00Z',
              endTime: '2026-03-16T01:00:00Z',
              priceEurPerKwh: 0.15,
              version: 0, // Stale
            },
          ],
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toContain('version_conflict');
    });
  });

  describe('TC-37: GET /sites/:siteId/tariffs/current - Get Current Tariff', () => {
    it('should return the current active tariff', async () => {
      const response = await request(app)
        .get(`${BASE_URL}/sites/${testSiteId}/tariffs/current`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('priceEurPerKwh');
    });
  });

  describe('TC-38: GET /sites/:siteId/tariffs/optimal-charge - Optimal Slots', () => {
    it('should return cheapest charge slots for target kWh', async () => {
      const response = await request(app)
        .get(`${BASE_URL}/sites/${testSiteId}/tariffs/optimal-charge`)
        .query({
          targetKwh: 10,
          from: '2026-03-16T00:00:00Z',
          to: '2026-03-16T06:00:00Z',
        });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.slots)).toBe(true);
      // Verify slots are sorted by price ascending
      const prices = response.body.slots.map((s: any) => s.priceEurPerKwh);
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });
  });

  describe('TC-39: Invalid Timezone (400)', () => {
    it('should reject tariff with invalid timezone', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/tariffs`)
        .send({
          slots: [
            {
              startTime: '2026-03-16T00:00:00',
              endTime: '2026-03-16T01:00:00',
              priceEurPerKwh: 0.10,
              timezone: 'INVALID/TZ',
            },
          ],
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('invalid_timezone');
    });
  });

  describe('TC-40: Price Range Validation', () => {
    it('should reject tariff with price out of range', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/tariffs`)
        .send({
          slots: [
            {
              startTime: '2026-03-16T00:00:00Z',
              endTime: '2026-03-16T01:00:00Z',
              priceEurPerKwh: -0.10, // Negative
            },
          ],
        });

      expect(response.status).toBe(422);
    });
  });

  describe('TC-41: GET /sites/:siteId/tariffs - Date Range Query', () => {
    it('should return tariffs for date range', async () => {
      const response = await request(app)
        .get(`${BASE_URL}/sites/${testSiteId}/tariffs`)
        .query({
          from: '2026-03-16T00:00:00Z',
          to: '2026-03-17T00:00:00Z',
        });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.slots)).toBe(true);
    });
  });

  describe('TC-42: Overlapping Slots Detection', () => {
    it('should reject overlapping tariff slots', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/tariffs`)
        .send({
          slots: [
            {
              startTime: '2026-03-16T00:00:00Z',
              endTime: '2026-03-16T02:00:00Z',
              priceEurPerKwh: 0.10,
            },
            {
              startTime: '2026-03-16T01:00:00Z',
              endTime: '2026-03-16T03:00:00Z',
              priceEurPerKwh: 0.15,
            },
          ],
        });

      expect(response.status).toBe(422);
      expect(response.body.error).toContain('overlapping_slots');
    });
  });

  describe('TC-43: Bulk Tariff Import', () => {
    it('should handle bulk day-ahead tariff import', async () => {
      const slots = Array.from({ length: 24 }, (_, i) => ({
        startTime: `2026-03-16T${String(i).padStart(2, '0')}:00:00Z`,
        endTime: `2026-03-16T${String(i + 1).padStart(2, '0')}:00:00Z`,
        priceEurPerKwh: 0.05 + Math.random() * 0.15,
      }));

      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/tariffs/bulk`)
        .send({ slots, source: 'day-ahead' });

      expect(response.status).toBe(201);
      expect(response.body.created).toBe(24);
    });
  });
});
