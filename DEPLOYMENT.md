# Power Energy - Production Deployment Guide

## Prerequisites

- Docker & Docker Compose
- PostgreSQL 16+
- Redis 7+
- Node.js 24+

## Quick Start (Development)

```bash
# Clone repository
git clone https://github.com/power-energy/power.git
cd power

# Install dependencies
pnpm install

# Start infrastructure
docker-compose up -d postgres redis

# Run migrations
pnpm db:migrate

# Start development
pnpm dev
```

## Production Deployment

### 1. Build Images

```bash
docker-compose build
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with production values
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string  
- `JWT_SECRET` - Random 32+ character string
- `EPEX_API_KEY` - EPEX Spot API key (optional)

### 3. Start Services

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

### 4. Verify Deployment

```bash
# Check API health
curl http://localhost:4000/health

# Check Web health
curl http://localhost:3000
```

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster
- kubectl configured
- Helm 3+

### Install

```bash
# Add Helm repository
helm repo add power-energy https://charts.power.energy
helm repo update

# Install chart
helm install power power-energy/power \
  --set database.url=$DATABASE_URL \
  --set redis.url=$REDIS_URL \
  --set jwt.secret=$JWT_SECRET
```

## Monitoring

### Prometheus
- Dashboard: http://localhost:9090
- Metrics endpoint: http://localhost:4000/metrics

### Grafana
- Dashboard: http://localhost:3001
- Default login: admin/admin

### Logs
```bash
# API logs
docker-compose logs -f api

# All logs
docker-compose logs -f
```

## Backup & Recovery

### Database Backup
```bash
# Backup
docker-compose exec postgres pg_dump -U power power_energy > backup.sql

# Restore
docker-compose exec -T postgres psql -U power power_energy < backup.sql
```

### Redis Backup
```bash
# Save RDB
docker-compose exec redis redis-cli SAVE
```

## Health Checks

| Service | Endpoint | Expected |
|---------|----------|----------|
| API | /health | {"status":"ok"} |
| API | /health/ready | {"status":"ready"} |
| Web | / | 200 OK |
| Worker | - | Running |

## Troubleshooting

### Database Connection Issues
```bash
# Check database logs
docker-compose logs postgres

# Test connection
docker-compose exec api sh -c "nc -zv postgres 5432"
```

### High Memory Usage
```bash
# Check memory usage
docker stats

# Reduce Redis memory
docker-compose exec redis redis-cli CONFIG SET maxmemory 256mb
```

### API Returns 502
```bash
# Check API logs
docker-compose logs api

# Restart API
docker-compose restart api
```

## Security

### Firewall Rules
```bash
# Allow only necessary ports
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw allow 5432  # PostgreSQL (from trusted IPs only)
ufw allow 6379  # Redis (from trusted IPs only)
```

### SSL/TLS
```bash
# Use nginx with Let's Encrypt
# See nginx/ssl.conf for configuration
```

## Scaling

### Horizontal Scaling
```bash
# Scale API replicas
docker-compose up -d --scale api=3

# Scale worker replicas  
docker-compose up -d --scale worker=2
```

### Load Balancing
```bash
# Nginx load balancing configured in nginx/nginx.conf
```

## Maintenance

### Update Dependencies
```bash
# Pull latest images
docker-compose pull

# Restart services
docker-compose up -d
```

### Log Rotation
```bash
# Configure in docker-compose.yml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

## Support

- Email: support@power.energy
- Documentation: docs.power.energy
- Status: status.power.energy
