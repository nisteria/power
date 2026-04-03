# Netzbetreiber Integration Guide

## Overview
Power integrates with Austrian grid operators (Netzbetreiber) to access smart meter data and enable automatic device control.

## Supported Netzbetreiber

| ID | Name | Region | Status | API Type |
|----|------|--------|--------|----------|
| wiener-netze | Wiener Netze | Vienna | ✅ Active | REST/OAuth2 |
| ooe | Netz Oberösterreich | Upper Austria | ✅ Active | REST/OAuth2 |
| salzburg | Salzburg Netz | Salzburg | ✅ Active | REST/OAuth2 |
| tinetz | TINETZ | Tyrol | 🔄 Coming | REST/API-Key |
| kaernten | Kärnten Netz | Carinthia | 🔄 Coming | REST/OAuth2 |
| burgendland | Netz Burgenland | Burgenland | 🔄 Coming | REST/OAuth2 |
| steiermark | Stromnetz Steiermark | Styria | 🔄 Coming | REST/OAuth2 |

## Integration Flow

### 1. Customer Authorization

```
┌─────────┐      ┌─────────┐      ┌──────────────┐      ┌──────────────┐
│ Customer │ ───▶ │  Power  │ ───▶ │ Netzbetreiber│ ───▶ │  Authorization│
│   App   │      │   API   │      │     UI       │      │     URL      │
└─────────┘      └─────────┘      └──────────────┘      └──────────────┘

1. Customer clicks "Connect Smart Meter"
2. Power generates OAuth request
3. Redirect to Netzbetreiber authorization page
4. Customer logs in and grants access
5. Redirect back with authorization code
6. Power exchanges code for access token
```

### 2. Data Retrieval

```
┌─────────┐      ┌─────────┐      ┌──────────────┐      ┌─────────────┐
│ Customer │ ◀─── │  Power  │ ◀─── │ Netzbetreiber│ ◀─── │ Smart Meter│
│   App   │      │   API   │      │     API      │      │   Device    │
└─────────┘      └─────────┘      └──────────────┘      └─────────────┘

1. Customer opens dashboard
2. Power requests consumption data from Netzbetreiber
3. Netzbetreiber API returns data
4. Power processes and displays to customer
```

## OAuth Configuration

### Wiener Netze Example

```javascript
const oauthConfig = {
  authorizationURL: 'https://iam.wienernetze.at/oauth/authorize',
  tokenURL: 'https://iam.wienernetze.at/oauth/token',
  clientID: process.env.WIENER_NETZE_CLIENT_ID,
  clientSecret: process.env.WIENER_NETZE_CLIENT_SECRET,
  scope: 'metering_data consumption_data',
  redirectURI: 'https://api.power.energy/smartmeter/callback'
};
```

## API Endpoints

### Get Authorization URL

```http
POST /smartmeter/authorize
Content-Type: application/json

{
  "netzbetreiberId": "wiener-netze",
  "meterId": "AT123456789012345678"
}

Response:
{
  "authorizationUrl": "https://iam.wienernetze.at/oauth/authorize?...",
  "state": "random_state_token",
  "expiresIn": 600
}
```

### Get Consumption Data

```http
GET /smartmeter/{meterId}/consumption
Headers: Authorization: Bearer {access_token}

Query Parameters:
- dateFrom: ISO date
- dateTo: ISO date
- interval: 15min | 1h | 1d

Response:
{
  "data": [
    {
      "timestamp": "2026-03-14T22:00:00Z",
      "consumptionKwh": 2.345,
      "powerKw": 5.678,
      "quality": "high"
    }
  ]
}
```

## Data Formats

### Consumption Data

| Field | Type | Description |
|-------|------|-------------|
| timestamp | ISO8601 | Time of reading |
| consumptionKwh | decimal | Energy consumed |
| powerKw | decimal | Current power |
| voltage | decimal | Voltage (V) |
| currentAmps | decimal | Current (A) |
| powerFactor | decimal | Power factor |
| quality | enum | high/medium/low/estimated |

## Error Handling

| Error Code | Description | Action |
|------------|-------------|--------|
| AUTH_EXPIRED | OAuth token expired | Re-authorize customer |
| METER_NOT_FOUND | Smart meter ID invalid | Show error to customer |
| RATE_LIMITED | Too many requests | Implement backoff |
| MAINTENANCE | Netzbetreiber maintenance | Show friendly message |

## Testing

### Sandbox Environment

Test credentials are available for development:

```javascript
const testConfig = {
  netzbetreiberId: 'wiener-netze-sandbox',
  clientId: 'test_client_id',
  clientSecret: 'test_client_secret',
  meterId: 'AT-TEST-123456789'
};
```

## Compliance

### GDPR
- All customer data is processed in EU
- Data retention: 90 days for consumption data
- Customers can request data deletion
- Data processing agreement with each Netzbetreiber

### Data Security
- OAuth 2.0 with PKCE for authorization
- TLS 1.3 for all API communications
- Encrypted storage for access tokens
- Regular security audits

## Support

- **Wiener Netze**: support@wienernetze.at
- **Netz OÖ**: netz-support@netzooe.at
- **Salzburg Netz**: support@salzburgnetz.at
- **Power Integration**: integration@power.energy
