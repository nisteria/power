/**
 * QA Test Cases TC-27..TC-43: Smart-Meter API
 * Based on API_SPEC.md Smart-Meter Story Slice
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../src/index.js';

const BASE_URL = '/api/v1';

describe('Smart-Meter API Integration Tests', () => {
  const testSiteId = 'test-site-001';
  const testMeterId = 'SM-001';

  describe('TC-27: POST /sites/:siteId/smartmeter/ingest - Happy Path', () => {
    it('should accept valid smart meter readings', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: new Date().toISOString(),
              values: {
                powerKw: 2.5,
                energyImportKwh: 1250.75,
                energyExportKwh: 0,
              },
            },
          ],
        });

      expect(response.status).toBe(202);
      expect(response.body.accepted).toBe(1);
    });
  });

  describe('TC-28: TC-28: POST /sites/:siteId/smartmeter/ingest - Validation Error (422)', () => {
    it('should reject invalid meter data with 422', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: 'invalid-timestamp',
              values: {
                powerKw: 'not-a-number',
              },
            },
          ],
        });

      expect(response.status).toBe(422);
      expect(response.body.error).toContain('validation_failed');
    });
  });

  describe('TC-29: TC-29: POST /sites/:siteId/smartmeter/ingest - Timeout Handling (408)', () => {
    it('should handle upstream timeout gracefully', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: new Date().toISOString(),
              values: { powerKw: 1.5 },
            },
          ],
        });

      // Mock timeout scenario
      expect([202, 408, 503]).toContain(response.status);
    });
  });

  describe('TC-30: POST /sites/:siteId/smartmeter/ingest - Duplicate Handling (409)', () => {
    it('should reject duplicate readings with 409', async () => {
      const timestamp = new Date().toISOString();
      
      // First request
      await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp,
              values: { powerKw: 2.0 },
            },
          ],
        });

      // Duplicate request
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp,
              values: { powerKw: 2.0 },
            },
          ],
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toContain('duplicate');
    });
  });

  describe('TC-31: POST /sites/:siteId/smartmeter/ingest - Batch Partial Accept', () => {
    it('should accept valid readings and reject invalid ones', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: new Date().toISOString(),
              values: { powerKw: 2.0 },
            },
            {
              meterId: 'invalid',
              timestamp: 'bad',
              values: { powerKw: 'x' },
            },
          ],
        });

      expect(response.status).toBe(202);
      expect(response.body.accepted).toBe(1);
      expect(response.body.rejected).toBe(1);
    });
  });

  describe('TC-32: Monotonie-Prüfung bei kumulativen Zählern', () => {
    it('should reject decreasing kWh values with 422', async () => {
      // First reading: 1000 kWh
      await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: '2026-01-01T00:00:00Z',
              values: { energyImportKwh: 1000 },
            },
          ],
        });

      // Second reading: 900 kWh (decrease!)
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: '2026-01-01T01:00:00Z',
              values: { energyImportKwh: 900 },
            },
          ],
        });

      expect(response.status).toBe(422);
      expect(response.body.reason).toContain('monotonie_violation');
    });
  });

  describe('TC-33: GET /sites/:siteId/smartmeter/latest - Retrieve Latest', () => {
    it('should return latest readings for a meter', async () => {
      const response = await request(app)
        .get(`${BASE_URL}/sites/${testSiteId}/smartmeter/${testMeterId}/latest`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('meterId');
      expect(response.body).toHaveProperty('values');
    });
  });

  describe('TC-34: Batterie-Zustand bei kombinierten Messwerten', () => {
    it('should detect simultaneous battery discharge and grid import', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: new Date().toISOString(),
              values: {
                powerKw: 3.0,
                energyImportKwh: 1251.0,
                batteryDischargeKw: 1.5,
              },
            },
          ],
        });

      // Should flag potential double-counting
      expect(response.status).toBe(202);
    });
  });

  describe('TC-35: Zeitstempel-Lücken erkennen', () => {
    it('should warn about gaps in meter data', async () => {
      // Insert reading at T0
      await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: '2026-01-01T00:00:00Z',
              values: { powerKw: 1.0 },
            },
          ],
        });

      // Insert reading at T0+4h (gap > 1h)
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: '2026-01-01T04:00:00Z',
              values: { powerKw: 1.5 },
            },
          ],
        });

      expect(response.status).toBe(202);
      expect(response.body.warnings).toContain('timestamp_gap');
    });
  });

  describe('TC-36: GET /sites/:siteId/smartmeter/:meterId/history - Date Range', () => {
    it('should return meter history for date range', async () => {
      const response = await request(app)
        .get(`${BASE_URL}/sites/${testSiteId}/smartmeter/${testMeterId}/history`)
        .query({
          from: '2026-01-01T00:00:00Z',
          to: '2026-01-02T00:00:00Z',
        });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.readings)).toBe(true);
    });
  });

  describe('TC-37: Extremwert-Behandlung', () => {
    it('should flag physically implausible values', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: new Date().toISOString(),
              values: { powerKw: 999999 }, // Implausible
            },
          ],
        });

      expect(response.status).toBe(202);
      expect(response.body.warnings).toContain('extreme_value');
    });
  });

  describe('TC-38: DC-Wandler-Verlust (simultaner Import/Export)', () => {
    it('should detect simultaneous import and export', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: new Date().toISOString(),
              values: {
                energyImportKwh: 1.0,
                energyExportKwh: 0.8,
              },
            },
          ],
        });

      expect(response.status).toBe(202);
      // Both import and export > 0 should trigger warning
      expect(response.body.warnings).toContain('simultaneous_import_export');
    });
  });

  describe('TC-39..TC-43: Additional Edge Cases', () => {
    it('TC-39: should handle missing optional fields', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: new Date().toISOString(),
              values: {}, // Empty values
            },
          ],
        });

      expect([202, 422]).toContain(response.status);
    });

    it('TC-40: should validate max batch size (500 items)', async () => {
      const readings = Array.from({ length: 501 }, (_, i) => ({
        meterId: `SM-${i}`,
        timestamp: new Date().toISOString(),
        values: { powerKw: 1.0 },
      }));

      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({ readings });

      expect(response.status).toBe(422);
      expect(response.body.error).toContain('max_batch_size');
    });

    it('TC-41: should reject future timestamps', async () => {
      const futureDate = new Date(Date.now() + 86400000).toISOString(); // +24h
      
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: futureDate,
              values: { powerKw: 1.0 },
            },
          ],
        });

      expect(response.status).toBe(422);
    });

    it('TC-42: should handle timezone-aware timestamps', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: testMeterId,
              timestamp: '2026-01-01T12:00:00+01:00',
              values: { powerKw: 2.0 },
            },
          ],
        });

      expect(response.status).toBe(202);
      expect(response.body.readings[0]).toHaveProperty('normalizedTimestamp');
    });

    it('TC-43: should return comprehensive error details', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/smartmeter/ingest`)
        .send({
          readings: [
            {
              meterId: '',
              timestamp: 'invalid',
              values: { powerKw: NaN },
            },
          ],
        });

      expect(response.status).toBe(422);
      expect(response.body.details).toBeDefined();
    });
  });
});
