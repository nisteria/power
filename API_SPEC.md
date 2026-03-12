# API_SPEC.md

Base URL: `/api/v1`

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

## Sites & Devices
- `GET /sites`
- `POST /sites`
- `GET /sites/:siteId/devices`
- `POST /sites/:siteId/devices`
- `POST /devices/:deviceId/commands`

## Tariffs & Prices
- `GET /sites/:siteId/tariff`
- `PUT /sites/:siteId/tariff`
- `GET /sites/:siteId/prices?from=&to=`

## Optimization
- `GET /sites/:siteId/policy`
- `PUT /sites/:siteId/policy`
- `POST /sites/:siteId/optimize/run`
- `GET /sites/:siteId/schedules/latest`

## Telemetry
- `POST /devices/:deviceId/telemetry`
- `GET /sites/:siteId/telemetry?from=&to=`

## Installer Portal
- `POST /installer/sites/:siteId/commission`
- `POST /installer/devices/:deviceId/test`

## Admin/Ops
- `GET /admin/audit-logs`
- `GET /admin/health`
