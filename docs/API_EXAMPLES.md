# API Examples

## cURL Examples

### Authentication

```bash
# Register
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "max@example.at",
    "password": "securePassword123!",
    "firstName": "Max",
    "lastName": "Muster"
  }'

# Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "max@example.at",
    "password": "securePassword123!"
  }'
```

### Get Profile

```bash
curl -X GET http://localhost:4000/customers/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Consumption Data

```bash
curl "http://localhost:4000/smartmeter/AT123456789/consumption?dateFrom=2026-03-01&dateTo=2026-03-07&interval=1h" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Device Schedule

```bash
curl -X POST http://localhost:4000/devices/device-123/schedule \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "charge",
    "startTime": "2026-03-15T22:00:00Z",
    "endTime": "2026-03-15T23:30:00Z",
    "targetValue": 90,
    "priority": 5
  }'
```

### Run Optimization

```bash
curl -X POST http://localhost:4000/optimization/run \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jobType": "schedule_optimization",
    "parameters": {
      "horizonHours": 24,
      "optimizeCost": true
    }
  }'
```

## JavaScript Examples

### Using Fetch

```javascript
const API_URL = 'http://localhost:4000';

// Login
async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const { accessToken } = await response.json();
  return accessToken;
}

// Get consumption data
async function getConsumption(token, meterId, dateFrom, dateTo) {
  const response = await fetch(
    `${API_URL}/smartmeter/${meterId}/consumption?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  
  return response.json();
}

// Example usage
const token = await login('max@example.at', 'password');
const data = await getConsumption(token, 'AT123456789', '2026-03-01', '2026-03-07');
console.log(data);
```

### Using Power SDK

```javascript
import { powerApi } from '@power-energy/sdk';

async function main() {
  // Login
  await powerApi.login('max@example.at', 'password');
  
  // Get devices
  const { devices } = await powerApi.getDevices();
  
  // Get recommendations
  const { recommendations } = await powerApi.getRecommendations();
  
  // Run optimization
  const result = await powerApi.runOptimization('schedule_optimization', {
    horizonHours: 24
  });
  
  console.log('Optimization complete:', result);
}

main();
```

## Python Examples

```python
import requests

API_URL = "http://localhost:4000"

class PowerAPI:
    def __init__(self):
        self.token = None
    
    def login(self, email, password):
        response = requests.post(
            f"{API_URL}/auth/login",
            json={"email": email, "password": password}
        )
        data = response.json()
        self.token = data["accessToken"]
        return self.token
    
    def get_devices(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(f"{API_URL}/devices", headers=headers)
        return response.json()
    
    def get_consumption(self, meter_id, date_from, date_to):
        headers = {"Authorization": f"Bearer {self.token}"}
        params = {
            "dateFrom": date_from,
            "dateTo": date_to,
            "interval": "1h"
        }
        response = requests.get(
            f"{API_URL}/smartmeter/{meter_id}/consumption",
            headers=headers,
            params=params
        )
        return response.json()

# Usage
api = PowerAPI()
api.login("max@example.at", "password")
devices = api.get_devices()
print(devices)
```

## Error Handling

```javascript
try {
  const data = await powerApi.getDevices();
} catch (error) {
  if (error.code === 'DEVICE_NOT_FOUND') {
    console.log('No devices found');
  } else if (error.code === 'AUTH_INVALID_TOKEN') {
    // Token expired, re-login
    await powerApi.login(email, password);
  } else {
    console.error('API Error:', error.message);
  }
}
```

## Webhook Payload Example

```json
{
  "event": "optimization.completed",
  "data": {
    "customerId": "cust_123",
    "jobId": "job_456",
    "result": {
      "schedules": [
        {
          "deviceId": "dev_789",
          "type": "charge",
          "startHour": 22,
          "endHour": 24,
          "estimatedSavings": 2.50
        }
      ],
      "estimatedSavingsMonthly": 18.50,
      "selfConsumptionPercent": 85
    }
  },
  "timestamp": "2026-03-14T23:45:00Z"
}
```
