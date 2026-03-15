# Power Energy - Architecture Decision Records (ADR)

## ADR 001: Use PostgreSQL with TimescaleDB

**Date:** 2026-03-14
**Status:** Accepted

### Context
We need a database that handles time-series data (smart meter consumption) efficiently while also supporting relational data (customers, devices, billing).

### Decision
Use PostgreSQL 16 with TimescaleDB extension for time-series. This gives us:
- Full relational capabilities of PostgreSQL
- Automatic partitioning for time-series data
- Excellent query performance
- Single database instead of multiple systems

### Consequences
- Need to manage TimescaleDB extension
- Some PostgreSQL features may have limitations
- Migration path from plain PostgreSQL is straightforward

---

## ADR 002: Use Next.js 14 for Frontend

**Date:** 2026-03-14
**Status:** Accepted

### Context
We need a modern, SEO-friendly frontend framework that supports SSR, static generation, and great developer experience.

### Decision
Use Next.js 14 with App Router and React Server Components.

### Consequences
- Excellent SEO with SSR
- Great developer experience with hot reload
- Larger bundle size (mitigated with code splitting)
- Learning curve for App Router patterns

---

## ADR 003: Use Fastify for API

**Date:** 2026-03-14
**Status:** Accepted

### Context
We need a high-performance Node.js web framework for our REST API.

### Decision
Use Fastify over Express.js.

### Consequences
- Better performance (2-3x faster than Express)
- Built-in schema validation
- TypeScript-first design
- Slightly smaller ecosystem than Express

---

## ADR 004: Use Drizzle ORM

**Date:** 2026-03-14
**Status:** Accepted

### Context
We need an ORM that provides type safety and minimal runtime overhead.

### Decision
Use Drizzle ORM with PostgreSQL.

### Consequences
- Full type safety
- SQL-like syntax (easier migrations)
- Lightweight (no runtime)
- Smaller community than Prisma

---

## ADR 005: Use Tailwind CSS

**Date:** 2026-03-14
**Status:** Accepted

### Context
We need a utility-first CSS framework for rapid UI development.

### Decision
Use Tailwind CSS with custom design tokens.

### Consequences
- Fast development velocity
- Small CSS bundle (purged in production)
- Consistent design system
- Class names can get long

---

## ADR 006: Use JWT for Authentication

**Date:** 2026-03-14
**Status:** Accepted

### Context
We need a stateless authentication mechanism for our API.

### Decision
Use JWT with short expiry (24h) and refresh tokens.

### Consequences
- Stateless and scalable
- Easy to implement
- Token invalidation requires Redis blocklist
- No built-in refresh mechanism

---

## ADR 007: Use Redis for Caching

**Date:** 2026-03-14
**Status:** Accepted

### Context
We need to cache expensive API responses and store session data.

### Decision
Use Redis as a caching layer.

### Consequences
- Sub-millisecond response times
- Simple key-value storage
- Requires additional infrastructure
- Cache invalidation complexity

---

## ADR 008: Use Docker for Deployment

**Date:** 2026-03-14
**Status:** Accepted

### Context
We need consistent deployment across environments.

### Decision
Use Docker with docker-compose for local and Kubernetes for production.

### Consequences
- Consistent environments
- Easy horizontal scaling
- Additional deployment complexity
- Build times can be long
