# Health Check API

## GET /health
Returns service health status.

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "uptime": 3600,
  "timestamp": "2026-03-15T02:30:00Z"
}
```

## GET /health/ready
Returns service readiness for load balancers.

**Response:**
```json
{
  "status": "ready",
  "checks": {
    "database": "ok",
    "redis": "ok"
  }
}
```

## GET /health/live
Returns liveness for Kubernetes probes.

**Response:**
```json
{
  "status": "alive"
}
```