/**
 * QA Test Cases for Device Control (Battery + Wallbox)
 * TC-20..TC-31 based on API_SPEC.md Device Control Flow
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../src/index.js';

const BASE_URL = '/api/v1';

describe('Device Control API Integration Tests', () => {
  const testSiteId = 'test-site-device-001';
  const testBatteryId = 'BAT-001';
  const testWallboxId = 'WB-001';

  describe('TC-20: POST /sites/:siteId/devices/:deviceId/commands - Wallbox Happy Path', () => {
    it('should accept wallbox charge command', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          command: 'charge',
          targetPowerKw: 7.2,
          issuedBy: 'user-001',
        });

      expect(response.status).toBe(201);
      expect(response.body.commandId).toBeDefined();
      expect(response.body.status).toBe('pending');
    });
  });

  describe('TC-21: POST /sites/:siteId/devices/:deviceId/commands - Battery Happy Path', () => {
    it('should accept battery discharge command', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testBatteryId}/commands`)
        .send({
          command: 'discharge',
          targetPowerKw: 5.0,
          targetSocPct: 20,
          issuedBy: 'user-001',
        });

      expect(response.status).toBe(201);
      expect(response.body.commandId).toBeDefined();
    });
  });

  describe('TC-22: POST /sites/:siteId/devices/:deviceId/commands - charge_now', () => {
    it('should accept immediate charge command', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testBatteryId}/commands`)
        .send({
          command: 'charge_now',
          targetSocPct: 80,
          issuedBy: 'user-001',
        });

      expect(response.status).toBe(201);
      expect(response.body.command).toBe('charge_now');
    });
  });

  describe('TC-23: POST /sites/:siteId/devices/:deviceId/commands - discharge_now', () => {
    it('should accept immediate discharge command', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testBatteryId}/commands`)
        .send({
          command: 'discharge_now',
          targetSocPct: 10,
          issuedBy: 'user-001',
        });

      expect(response.status).toBe(201);
      expect(response.body.command).toBe('discharge_now');
    });
  });

  describe('TC-24: Invalid Command Parameters (422)', () => {
    it('should reject command with invalid parameters', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          command: 'charge',
          targetPowerKw: 999, // Exceeds max
          issuedBy: 'user-001',
        });

      expect(response.status).toBe(422);
      expect(response.body.error).toContain('invalid_command_params');
    });
  });

  describe('TC-25: GET /sites/:siteId/devices/:deviceId/commands/:commandId - Status Check', () => {
    it('should return command status', async () => {
      // First create a command
      const createResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          command: 'charge',
          targetPowerKw: 7.2,
          issuedBy: 'user-001',
        });

      const commandId = createResponse.body.commandId;

      // Then check status
      const statusResponse = await request(app)
        .get(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands/${commandId}`);

      expect(statusResponse.status).toBe(200);
      expect(statusResponse.body.status).toBeDefined();
    });
  });

  describe('TC-26: Command Conflict (409)', () => {
    it('should reject command when device has active command', async () => {
      // Create first command
      await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testBatteryId}/commands`)
        .send({
          command: 'charge',
          targetPowerKw: 5.0,
          issuedBy: 'user-001',
        });

      // Try second command
      const conflictResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testBatteryId}/commands`)
        .send({
          command: 'discharge',
          targetPowerKw: 5.0,
          issuedBy: 'user-001',
        });

      expect(conflictResponse.status).toBe(409);
      expect(conflictResponse.body.error).toContain('command_conflict');
    });
  });

  describe('TC-27: Device Acknowledgment', () => {
    it('should acknowledge command', async () => {
      // Create command
      const createResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          command: 'charge',
          targetPowerKw: 7.2,
          issuedBy: 'user-001',
        });

      const commandId = createResponse.body.commandId;

      // Acknowledge
      const ackResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands/${commandId}/acknowledge`)
        .send({
          status: 'acknowledged',
        });

      expect(ackResponse.status).toBe(200);
      expect(ackResponse.body.status).toBe('acknowledged');
    });
  });

  describe('TC-28: Command Expiration', () => {
    it('should expire pending commands after TTL', async () => {
      // Create command with short TTL
      const createResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          command: 'charge',
          targetPowerKw: 7.2,
          issuedBy: 'user-001',
          commandTTL: 1, // 1 second
        });

      const commandId = createResponse.body.commandId;

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check status
      const statusResponse = await request(app)
        .get(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands/${commandId}`);

      expect(statusResponse.body.status).toBe('expired');
    });
  });

  describe('TC-29: GET /sites/:siteId/devices/:deviceId/command-events - Event History', () => {
    it('should return command event history', async () => {
      const response = await request(app)
        .get(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/command-events`)
        .query({ limit: 10 });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.events)).toBe(true);
    });
  });

  describe('TC-30: Idempotent Replay', () => {
    it('should handle idempotent command replay within 24h', async () => {
      const payload = {
        command: 'charge',
        targetPowerKw: 7.2,
        issuedBy: 'user-001',
      };

      // First request
      const firstResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send(payload);

      // Exact same request (replay)
      const replayResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send(payload);

      // Should return same command ID (idempotent)
      expect(replayResponse.body.commandId).toBe(firstResponse.body.commandId);
    });
  });

  describe('TC-31: Command with Mismatched Payload (409)', () => {
    it('should return 409 for same commandId with different payload', async () => {
      const firstResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          command: 'charge',
          targetPowerKw: 7.2,
          issuedBy: 'user-001',
        });

      const commandId = firstResponse.body.commandId;

      // Same commandId but different payload
      const mismatchResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          commandId,
          command: 'charge',
          targetPowerKw: 11.0, // Different!
          issuedBy: 'user-001',
        });

      expect(mismatchResponse.status).toBe(409);
      expect(mismatchResponse.body.error).toContain('payload_mismatch');
    });
  });

  describe('TC-32: Device Not Found (404)', () => {
    it('should return 404 for non-existent device', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/NONEXISTENT/commands`)
        .send({
          command: 'charge',
          issuedBy: 'user-001',
        });

      expect(response.status).toBe(404);
    });
  });

  describe('TC-33: Unauthorized (403)', () => {
    it('should return 403 for unauthorized user', async () => {
      const response = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          command: 'charge',
          issuedBy: 'unauthorized-user',
        });

      expect([401, 403]).toContain(response.status);
    });
  });

  describe('TC-34: Command Status Transitions', () => {
    it('should track command status correctly', async () => {
      // Create
      const createResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands`)
        .send({
          command: 'charge',
          targetPowerKw: 7.2,
          issuedBy: 'user-001',
        });

      expect(createResponse.body.status).toBe('pending');

      // Acknowledge
      const ackResponse = await request(app)
        .post(`${BASE_URL}/sites/${testSiteId}/devices/${testWallboxId}/commands/${createResponse.body.commandId}/acknowledge`)
        .send({ status: 'acknowledged' });

      expect(ackResponse.body.status).toBe('acknowledged');
      expect(ackResponse.body.acknowledgmentAt).toBeDefined();
    });
  });
});
