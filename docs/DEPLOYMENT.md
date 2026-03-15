# Deployment Documentation

This document explains how to deploy the Power project to various environments.

## Production Deployment
1. Ensure all tests pass.
2. Build the project with `pnpm build`.
3. Push to the production server.
4. Run database migrations.

## Staging Deployment
1. Build the project with `pnpm build`.
2. Deploy to the staging server.
3. Test the deployment thoroughly.

## Development Deployment
1. Clone the repository.
2. Install dependencies with `pnpm install`.
3. Start the development server.

## Environment Variables
Make sure to set up the following environment variables:
- DATABASE_URL
- REDIS_URL
- JWT_SECRET