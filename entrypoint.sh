#!/bin/sh

# Set NODE_ENV to production
export NODE_ENV=production



# Run npm migration
pnpm run migration:up

pnpm run seed create:users

pnpm run test:e2e

# Run pm2 with the provided configuration file
pnpm run start:prod