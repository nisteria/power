# Power - MVP Pilot Setup Guide

## Overview
This document outlines the steps to set up a test environment for MVP pilot testing.

## Prerequisites
- [ ] Kubernetes cluster (or Docker Compose for local)
- [ ] PostgreSQL database
- [ ] Redis instance
- [ ] Smart Meter simulator (for testing)

## Quick Start (Local)

### 1. Start Infrastructure
```bash
docker-compose -f docker-compose.yml up -d
```

### 2. Run Migrations
```bash
cd apps/api
npm run db:migrate
```

### 3. Seed Test Data
```bash
cd apps/api
npm run db:seed
```

### 4. Start Services
```bash
# Terminal 1: API
cd apps/api && npm run dev

# Terminal 2: Web
cd apps/web && npm run dev

# Terminal 3: Worker
cd apps/worker && npm run dev
```

## Test Accounts
| Email | Role |
|-------|------|
| pilot@power.at | Pilot User (limited) |
| admin@power.at | Admin |

## Smart Meter Simulation
For testing without real hardware, use the included mock:
```bash
node apps/worker/src/jobs/simulator.js
```

## Monitoring
- API Health: http://localhost:3000/health
- Metrics: http://localhost:3000/metrics

## Testing Checklist
- [ ] User registration flow
- [ ] Device pairing
- [ ] Tariff display
- [ ] Optimization recommendations
- [ ] Push notifications
- [ ] Billing integration

## Troubleshooting
See `docs/TROUBLESHOOTING.md` for common issues.
