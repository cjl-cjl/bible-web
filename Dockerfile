FROM docker.io/oven/bun:latest AS base

WORKDIR /app

FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --no-save --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM base AS runner

WORKDIR /app

RUN groupadd -g 1001 bunjs \
 && useradd -u 1001 -g bunjs -s /bin/bash -m nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:bunjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bunjs /app/.next/static ./.next/static

USER nextjs

CMD ["bun", "server.js"]
