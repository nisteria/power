# Monitoring & Observability Stack

## Overview
Power Energy uses a comprehensive observability stack for monitoring, logging, and alerting.

## Components

### Prometheus (Metrics)
- Scrapes metrics from all services
- Custom metrics for business logic
- Retention: 30 days

### Grafana (Visualization)
- Dashboards for each service
- Pre-built panels for:
  - API performance
  - Database metrics
  - Business KPIs

### Loki (Logs)
- Aggregates logs from all services
- Structured JSON logging
- Retention: 14 days

### Alertmanager (Alerts)
- Routes alerts to:
  - Email
  - Slack
  - PagerDuty (optional)

## Access

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)
- Loki: http://localhost:3100

## Key Dashboards

### API Dashboard
- Request rate
- Error rate
- Response latency (p50, p95, p99)
- Active connections

### Database Dashboard
- Query performance
- Connection pool
- Replication lag
- Storage usage

### Business Dashboard
- Active customers
- Revenue metrics
- Device connections
- Optimization savings

## Alerts

| Alert | Severity | Description |
|-------|----------|-------------|
| HighErrorRate | Critical | API error rate > 5% |
| HighLatency | Warning | p95 latency > 2s |
| DatabaseDown | Critical | Database unreachable |
| DiskSpaceLow | Warning | Disk usage > 80% |
| CertificateExpiring | Warning | SSL cert expires < 30 days |

## Query Examples

### API Request Rate
```promql
rate(http_requests_total[5m])
```

### Average Response Time
```promql
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

### Active Devices
```promql
sum(power_devices_active)
```

### Daily Savings
```promql
sum(power_savings_total{datatype="daily"})
```
