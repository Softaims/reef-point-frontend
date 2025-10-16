# Multi-stage build for production
# Stage 1: Build the application
FROM node:18-alpine AS builder

# Enable Corepack for Yarn 4.5.1
RUN corepack enable && corepack prepare yarn@4.5.1 --activate

# Set working directory
WORKDIR /app

# Copy package management files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies with immutable lockfile (production build)
RUN yarn install --immutable

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
