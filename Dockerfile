# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat bash

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm globally (ensure it's available in this stage)
RUN npm install -g pnpm

# Copy node_modules and other files from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run the build script
RUN pnpm build:standalone

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

# Ensure the directories exist before copying
RUN if [ -d /app/.next/standalone ]; then echo "Standalone directory exists"; else echo "Standalone directory does not exist"; fi
RUN if [ -d /app/.next/static ]; then echo "Static directory exists"; else echo "Static directory does not exist"; fi

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the application port
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
