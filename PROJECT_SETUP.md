# Power - Project Setup Guide

## Quick Start

### Prerequisites
- Node.js 24+
- pnpm
- Docker & Docker Compose
- PostgreSQL 16+
- Redis 7+

### Development Setup

```bash
# 1. Clone and install
git clone https://github.com/power-energy/power.git
cd power
pnpm install

# 2. Environment
cp .env.example .env
# Edit .env with your credentials

# 3. Start infrastructure
docker-compose up -d postgres redis

# 4. Run migrations
pnpm db:migrate

# 5. Start development server
pnpm dev
```

### Production Setup

```bash
# Build and start all services
docker-compose up -d --build

# Check status
docker-compose ps
docker-compose logs -f api
```

## Project Structure

```
power/
├── apps/
│   ├── api/              # Node.js API Backend
│   │   ├── src/
│   │   │   ├── routes/   # API Routes
│   │   │   ├── services/ # Business Logic
│   │   │   ├── models/   # Drizzle Models
│   │   │   ├── middleware/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── web/              # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/     # Next.js App Router
│   │   │   ├── components/
│   │   │   ├── lib/     # Utilities
│   │   │   └── pages/
│   │   └── package.json
│   │
│   └── worker/           # Background Jobs
│       └── package.json
│
├── packages/
│   ├── database/         # Shared DB Schema
│   ├── config/          # Shared Config
│   └── types/           # Shared TypeScript Types
│
├── infra/
│   ├── docker/          # Docker configs
│   ├── k8s/             # Kubernetes manifests
│   └── terraform/       # Infrastructure as Code
│
├── scripts/              # DevOps Scripts
├── tests/               # E2E Tests
└── docs/                # Documentation
```

## Environment Variables

### Required
```env
DATABASE_URL=postgres://power:password@localhost:5432/power_energy
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_min_32_chars
```

### Optional - External APIs
```env
# EPEX Spot Prices
EPEX_API_KEY=your_epex_api_key

# Netzbetreiber OAuth (Wiener Netze)
WIENER_NETZE_CLIENT_ID=xxx
WIENER_NETZE_CLIENT_SECRET=xxx
```

### Optional - Services
```env
# Monitoring
PROMETHEUS_ENABLED=true
GRAFANA_PASSWORD=admin

# Email (SendGrid/Postmark)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=xxx
SMTP_PASS=xxx
```

## Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:api          # API only
pnpm dev:web          # Frontend only

# Database
pnpm db:migrate       # Run migrations
pnpm db:generate      # Generate types
pnpm db:seed          # Seed database

# Testing
pnpm test             # Unit tests
pnpm test:e2e         # E2E tests
pnpm test:coverage    # Coverage report

# Building
pnpm build            # Build all apps
pnpm build:api        # API only
pnpm build:web        # Frontend only

# Docker
docker-compose up -d          # Start all
docker-compose down           # Stop all
docker-compose logs -f api    # Follow API logs

# Deployment
pnpm deploy:staging   # Deploy to staging
pnpm deploy:prod     # Deploy to production
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js 24, Fastify, TypeScript |
| Database | PostgreSQL 16, Drizzle ORM, TimescaleDB |
| Cache | Redis 7 |
| Frontend | Next.js 14, React, TypeScript |
| Auth | JWT, OAuth2 |
| Infrastructure | Docker, Kubernetes |
| Monitoring | Prometheus, Grafana, ELK |
| CI/CD | GitHub Actions |

## API Documentation

Once running:
- Swagger UI: http://localhost:4000/docs
- Health: http://localhost:4000/health

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

### Redis Connection Issues
```bash
# Check Redis
docker exec -it power-redis redis-cli ping

# Should return: PONG
```

### Port Conflicts
```bash
# Check what's using the port
lsof -i :4000
lsof -i :3000
```

## Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and add tests
3. Run linting: `pnpm lint`
4. Commit with conventional commits
5. Push and create PR

## License

MIT - See LICENSE file
