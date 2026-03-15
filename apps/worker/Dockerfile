# Worker Dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile --prod

COPY . .

USER node

CMD ["node", "src/index.js"]
