# CHANGELOG.md - Power Energy

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-03-14

### Added
- Initial MVP release
- Smart Meter API integration (Wiener Netze, OÖ, Salzburg)
- Device management (Battery, Wallbox, Heat Pump)
- Dynamic tariff optimization
- EPEX spot price integration
- Automated scheduling algorithm
- Web dashboard with real-time monitoring
- Invoice generation and payment processing
- Webhook system for external integrations
- OAuth2 authentication

### Features
- Customer portal with dashboard
- Device control and monitoring
- Tariff comparison and recommendations
- Billing and invoice management
- RESTful API with OpenAPI documentation
- Background worker for price updates and optimization

### Technical
- PostgreSQL database with TimescaleDB
- Redis caching
- Next.js 14 frontend
- Fastify API backend
- Drizzle ORM
- Docker containerization
- GitHub Actions CI/CD

## [0.9.0] - 2026-02-01

### Added
- Beta testing program
- Initial OAuth integration
- Basic device control

### Known Issues
- Rate limiting not implemented
- Some netzbetreiber APIs unstable
