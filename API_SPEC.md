# API_SPEC.md - Power Energy Orchestrator

**Version:** 1.0  
**Datum:** 2026-03-14  
**Scope:** MVP API Specification  

---

## Authentication

All API endpoints (except public endpoints) require authentication:
- **Bearer Token:** JWT token in Authorization header
- **API Key:** For service-to-service communication

```
Authorization: Bearer <jwt_token>
X-API-Key: <api_key>
```

---

## Base URL
```
Production: https://api.power.energy/v1
Staging: https://api.staging.power.energy/v1
Development: http://localhost:4000/v1
```

---

## Public Endpoints

### Health Check
```
GET /health
```
Response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-03-14T23:45:00Z"
}
```

---

## Customer Endpoints

### Register Customer
```
POST /customers/register
```
Request:
```json
{
  "email": "max.muster@example.at",
  "password": "securePassword123!",
  "firstName": "Max",
  "lastName": "Muster",
  "phone": "+436641234567",
  "address": {
    "street": "Musterstraße",
    "houseNumber": "15",
    "door": "2a",
    "postalCode": "1010",
    "city": "Wien"
  }
}
```
Response (201):
```json
{
  "id": "uuid",
  "email": "max.muster@example.at",
  "status": "pending",
  "verificationToken": "xxx"
}
```

### Verify Email
```
POST /customers/verify
```
Request:
```json
{
  "token": "verification_token"
}
```

### Login
```
POST /auth/login
```
Request:
```json
{
  "email": "max.muster@example.at",
  "password": "securePassword123!"
}
```
Response:
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "expiresIn": 3600,
  "customer": {
    "id": "uuid",
    "email": "max.muster@example.at",
    "firstName": "Max",
    "lastName": "Muster"
  }
}
```

### Get Current Customer
```
GET /customers/me
```
Response:
```json
{
  "id": "uuid",
  "email": "max.muster@example.at",
  "firstName": "Max",
  "lastName": "Muster",
  "phone": "+436641234567",
  "status": "active",
  "customerType": "residential",
  "createdAt": "2026-01-15T10:00:00Z"
}
```

---

## Smart Meter Endpoints

### Authorize Smart Meter Access
```
POST /smartmeter/authorize
```
Request:
```json
{
  "netzbetreiberId": "uuid",
  "meterId": "AT123456789012345678",
  "customerId": "customer_uuid"
}
```
Response:
```json
{
  "authorizationUrl": "https://wienernetze.at/oauth/authorize?client_id=...",
  "state": "random_state_token",
  "expiresIn": 600
}
```

### OAuth2 Callback
```
GET /smartmeter/callback?code=xxx&state=xxx
```
Redirects to app after successful authorization.

### Get Consumption Data
```
GET /smartmeter/{meterId}/consumption
```
Query Parameters:
- `dateFrom`: ISO date (required)
- `dateTo`: ISO date (required)
- `interval`: 15min | 1h | 1d (default: 1h)

Response:
```json
{
  "meterId": "AT123456789012345678",
  "netzbetreiber": "Wiener Netze",
  "data": [
    {
      "timestamp": "2026-03-14T22:00:00Z",
      "consumptionKwh": 2.345,
      "powerKw": 5.678,
      "quality": "high"
    }
  ],
  "totalKwh": 123.45,
  "currency": "EUR"
}
```

### Get Real-time Data
```
GET /smartmeter/{meterId}/realtime
```
Response:
```json
{
  "meterId": "AT123456789012345678",
  "timestamp": "2026-03-14T23:45:00Z",
  "currentPowerKw": 3.456,
  "last15MinKwh": 0.864,
  "voltage": 230.5,
  "currentAmps": 15.2,
  "powerFactor": 0.95
}
```

### Get Consumption History
```
GET /smartmeter/{meterId}/history
```
Query Parameters:
- `months`: 1-24 (default: 3)

Response:
```json
{
  "meterId": "AT123456789012345678",
  "period": {
    "from": "2025-12-14",
    "to": "2026-03-14"
  },
  "dailyTotals": [
    {
      "date": "2026-03-14",
      "totalKwh": 15.67,
      "avgPowerKw": 2.34,
      "peakPowerKw": 8.12
    }
  ],
  "totalKwh": 1234.56,
  "estimatedCost": 245.67
}
```

---

## Device Endpoints

### List Devices
```
GET /devices
```
Response:
```json
{
  "devices": [
    {
      "id": "uuid",
      "type": "battery",
      "manufacturer": "BYD",
      "model": "HVS 12.8",
      "serialNumber": "BYD123456789",
      "status": "active",
      "socPercent": 75.5,
      "capabilities": ["charge", "discharge", "monitor"],
      "config": {
        "minSocPercent": 20,
        "maxSocPercent": 90
      }
    }
  ]
}
```

### Get Device Details
```
GET /devices/{deviceId}
```
Response:
```json
{
  "id": "uuid",
  "type": "battery",
  "manufacturer": "BYD",
  "model": "HVS 12.8",
  "serialNumber": "BYD123456789",
  "status": "active",
  "firmwareVersion": "3.2.1",
  "installationDate": "2025-06-15",
  "warrantyExpiry": "2030-06-15",
  "currentState": {
    "socPercent": 75.5,
    "powerKw": -2.5,
    "charging": true,
    "temperature": 28
  },
  "config": {
    "minSocPercent": 20,
    "maxSocPercent": 90,
    "chargePriority": "solar_first"
  },
  "capabilities": ["charge", "discharge", "monitor"]
}
```

### Update Device Config
```
PATCH /devices/{deviceId}/config
```
Request:
```json
{
  "minSocPercent": 15,
  "maxSocPercent": 95,
  "chargePriority": "solar_first"
}
```

### Get Device Schedule
```
GET /devices/{deviceId}/schedule
```
Response:
```json
{
  "deviceId": "uuid",
  "schedules": [
    {
      "id": "uuid",
      "type": "charge",
      "startTime": "2026-03-14T22:00:00Z",
      "endTime": "2026-03-14T23:30:00Z",
      "targetValue": 90,
      "priority": 5,
      "status": "completed"
    }
  ]
}
```

### Create Device Schedule
```
POST /devices/{deviceId}/schedule
```
Request:
```json
{
  "type": "charge",
  "startTime": "2026-03-15T22:00:00Z",
  "endTime": "2026-03-15T23:30:00Z",
  "targetValue": 90,
  "priority": 5
}
```

---

## Optimization Endpoints

### Get Optimization Recommendations
```
GET /optimization/recommendations
```
Response:
```json
{
  "customerId": "uuid",
  "recommendations": [
    {
      "id": "uuid",
      "type": "tariff_change",
      "title": "Switch to dynamic tariff",
      "description": "You could save €15/month by switching to dynamic pricing",
      "potentialSavingsMonthly": 15.00,
      "priority": 8,
      "status": "pending"
    }
  ]
}
```

### Run Optimization
```
POST /optimization/run
```
Request:
```json
{
  "jobType": "schedule_optimization",
  "parameters": {
    "horizonHours": 24,
    "optimizeCost": true,
    "optimizeSelfConsumption": true
  }
}
```
Response:
```json
{
  "jobId": "uuid",
  "status": "running"
}
```

### Get Optimization Status
```
GET /optimization/jobs/{jobId}
```
Response:
```json
{
  "jobId": "uuid",
  "jobType": "schedule_optimization",
  "status": "completed",
  "startedAt": "2026-03-14T23:40:00Z",
  "completedAt": "2026-03-14T23:40:05Z",
  "result": {
    "schedules": [...],
    "estimatedSavingsMonthly": 18.50,
    "newSelfConsumptionPercent": 85
  }
}
```

---

## Billing Endpoints

### Get Invoices
```
GET /billing/invoices
```
Query Parameters:
- `status`: all | pending | paid | overdue
- `limit`: 1-50 (default: 20)
- `offset`: 0+

Response:
```json
{
  "invoices": [
    {
      "id": "uuid",
      "invoiceNumber": "INV-2026-0001",
      "type": "subscription",
      "billingPeriod": {
        "from": "2026-02-01",
        "to": "2026-02-28"
      },
      "totalCents": 1490,
      "currency": "EUR",
      "status": "paid",
      "issuedAt": "2026-03-01T00:00:00Z",
      "paidAt": "2026-03-02T10:30:00Z"
    }
  ],
  "total": 5,
  "limit": 20,
  "offset": 0
}
```

### Get Invoice Details
```
GET /billing/invoices/{invoiceId}
```
Response:
```json
{
  "id": "uuid",
  "invoiceNumber": "INV-2026-0001",
  "customer": {
    "id": "uuid",
    "name": "Max Muster"
  },
  "items": [
    {
      "description": "EMS SaaS - February 2026",
      "quantity": 1,
      "unit": "month",
      "unitPriceCents": 1490,
      "totalPriceCents": 1490
    }
  ],
  "subtotalCents": 1490,
  "taxCents": 298,
  "totalCents": 1788,
  "currency": "EUR"
}
```

---

## Webhook Endpoints

### Register Webhook
```
POST /webhooks
```
Request:
```json
{
  "url": "https://example.com/webhook",
  "events": ["device.state_changed", "optimization.completed", "billing.invoice_paid"],
  "secret": "webhook_secret_key"
}
```

### List Webhooks
```
GET /webhooks
```

### Delete Webhook
```
DELETE /webhooks/{webhookId}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 429 Too Many Requests
```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded",
    "retryAfter": 60
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "uuid"
  }
}
```

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| /smartmeter/*/consumption | 100/hour |
| /smartmeter/*/realtime | 10/minute |
| /devices/* | 200/hour |
| /optimization/* | 50/hour |
| /billing/* | 100/hour |

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1647225600
```

---

## Versioning

The API uses URL versioning:
- Current version: `/v1`
- Future versions: `/v2`, etc.

Breaking changes will result in a new version URL.
Deprecation notices will be sent 6 months in advance.

---

## SDK Libraries

Official SDKs available:
- JavaScript/TypeScript: `@power-energy/sdk`
- Python: `power-energy-sdk`
- Go: `github.com/power-energy/go-sdk`

---

## Postman Collection

Download the Postman collection for testing:
`/docs/postman/power-api-v1.postman_collection.json`
