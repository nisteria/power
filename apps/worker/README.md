# Optimization Engine - Background Worker

## Overview
Der Worker verarbeitet alle rechenintensiven Aufgaben asynchron:
- EPEX Preis-Updates
- Optimierungskalkulationen
- Device-Steuerung
- Billing-Generierung

## Jobs

### 1. EPEX Price Fetch
```typescript
// Fetch EPEX spot prices every 15 minutes
cron: "*/15 * * * *"
source: EPEX API
target: database.epex_prices
```

### 2. Optimization Engine
```typescript
// Run optimization for all active customers
cron: "0 */6 * * *"  // Every 6 hours
source: consumption_data + tariffs + device_capabilities
target: optimization_recommendations + device_schedules
```

### 3. Billing Generator
```typescript
// Generate monthly invoices
cron: "0 1 1 * *"  // 1st of month at 01:00
source: customer_tariffs + usage_data
target: invoices
```

### 4. Device Sync
```typescript
// Sync device states every 5 minutes
cron: "*/5 * * * *"
source: device APIs (Wallbox, Battery, etc.)
target: device_states
```

## Setup

```bash
# Start worker
pnpm worker

# Or with Docker
docker-compose up worker
```

## Queue System

Using Redis/Bull for job queue:
- `price:fetch` - EPEX price updates
- `optimize:run` - Customer optimization
- `billing:generate` - Invoice generation
- `device:sync` - Device state sync
