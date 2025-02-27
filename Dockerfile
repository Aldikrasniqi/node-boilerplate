# syntax=docker/dockerfile:1

# Base stage for shared steps
FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm clean-install --ignore-scripts

# Development stage
FROM base as development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM base as builder
COPY . .
# Add verbose logging to see what's happening during build
RUN npm run build && ls -la dist && ls -la dist/src || true

# Production stage
FROM node:20-alpine as production
WORKDIR /app

# Define build time arguments
ARG NODE_ENV=production
ARG PORT=3000

# Set runtime environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm clean-install --ignore-scripts --only=production && npm install --ignore-scripts --save-prod tsconfig-paths

# Copy tsconfig.json for path aliases
COPY tsconfig.json ./

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Verify the dist directory structure
RUN ls -la dist && ls -la dist/src || echo "dist/src directory not found"

# Expose the port
EXPOSE ${PORT}

# Start the application with tsconfig-paths
CMD ["node", "-r", "tsconfig-paths/register", "./dist/src/index.js"]
