// Integration Tests - API
import { test, expect } from 'vitest';

test('GET /health returns 200', async () => {
  const response = await fetch('http://localhost:4000/health');
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.status).toBe('ok');
});

test('POST /auth/register creates user', async () => {
  const response = await fetch('http://localhost:4000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    }),
  });
  expect(response.status).toBe(201);
});

test('GET /smartmeter/:meterId/consumption requires auth', async () => {
  const response = await fetch('http://localhost:4000/smartmeter/AT12345/consumption?dateFrom=2026-03-01&dateTo=2026-03-07');
  expect([401, 302]).toContain(response.status);
});
