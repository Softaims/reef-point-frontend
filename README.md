# Reef-Points Frontend

Reef-Points Frontend is a modern React-based admin and user dashboard for managing and tracking campaign points on the Reef blockchain.

## Features

### Admin Panel

- Secure login for admins (with provided credentials)
- View, create, update, and delete campaigns
- Edit campaign pool configurations and season dates
- Responsive dashboard with campaign stats and recent activity

### User Dashboard

- Connect wallet
- View personal ranking and points
- See leaderboard and referral stats
- Mobile-friendly and fast UI

## Tech Stack

- React 18 + Vite
- Yarn 4.5.1 (with Corepack)
- Tailwind CSS for styling
- Zod for form validation
- Axios for API requests
- Lucide React for icons
- @reef-chain/ui-kit for wallet and UI components

## Environment Setup

Before running the project, create a `.env` file in the root directory and add the following environment variable:

```env
# For local development
VITE_API_BASE_URL=http://localhost:3004

# For production
# VITE_API_BASE_URL=https://api.example.com
```

You can set this to your local backend or production API URL as needed.

To clone and run the backend API, visit: [reef-points-backend](https://github.com/abdul745/reef-points-backend)

## Getting Started

### Local Development

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Start the development server:**

   ```bash
   yarn dev
   ```

3. **Login as Admin:**

   - Use the provided admin credentials to access the admin panel.

4. **Connect as User:**
   - Connect your wallet to view your points and ranking.

### Production Build

```bash
# Build for production
yarn build

# Preview production build locally
yarn preview
```

## Docker Deployment

### Quick Start with Docker

1. **Build and run with Docker Compose (Recommended):**

   ```bash
   docker-compose up -d
   ```

2. **Or build manually:**

   ```bash
   # Build the image
   docker build -t reef-points-frontend .

   # Run the container
   docker run -d -p 80:80 --name reef-points reef-points-frontend
   ```

### Production Deployment

1. **Create production environment file:**

   ```bash
   # Copy the example file
   cp .env.production.example .env.production

   # Edit with your production values
   # VITE_API_BASE_URL=https://points.reef.host
   ```

2. **Build and push to registry:**

   ```bash
   docker build -t reef-points-frontend:latest .
   docker tag reef-points-frontend:latest your-registry/reef-points-frontend:v1.0.0
   docker push your-registry/reef-points-frontend:v1.0.0
   ```

3. **Deploy on server:**

   ```bash
   docker pull your-registry/reef-points-frontend:v1.0.0
   docker run -d \
     -p 80:80 \
     --name reef-points \
     --restart unless-stopped \
     your-registry/reef-points-frontend:v1.0.0
   ```

### Docker Features

- ✅ Multi-stage build for minimal image size
- ✅ Nginx Alpine for production serving
- ✅ Gzip compression enabled
- ✅ Smart asset caching (1 year for static files)
- ✅ SPA routing support
- ✅ Security headers configured
- ✅ Health checks included

### Container Management

```bash
# View logs
docker logs -f reef-points

# Restart container
docker restart reef-points

# Stop container
docker stop reef-points

# Remove container
docker rm -f reef-points

# Check health status
docker inspect --format='{{.State.Health.Status}}' reef-points
```

### Using Custom Port

```bash
# Run on port 8080
docker run -d -p 8080:80 --name reef-points reef-points-frontend
```

Or update `docker-compose.yml`:

```yaml
ports:
  - "8080:80"
```

## Project Structure

```
reef-points-frontend/
├── src/
│   ├── pages/          # Main pages (Dashboard, Campaigns, Auth, etc.)
│   ├── components/     # Reusable UI and dashboard components
│   │   ├── Dashboard/  # Admin dashboard components
│   │   ├── Home/       # User home page components
│   │   ├── Layout/     # Layout components
│   │   ├── Popup/      # Modal and popup components
│   │   └── common/     # Shared components
│   ├── api/            # API service layer
│   ├── contexts/       # React contexts (Auth, etc.)
│   ├── routes/         # Route configuration
│   ├── data/           # Mock data and constants
│   └── assets/         # Images and static assets
├── public/             # Public static files
├── Dockerfile          # Docker multi-stage build
├── nginx.conf          # Nginx configuration for production
├── docker-compose.yml  # Docker Compose orchestration
└── .dockerignore       # Docker ignore rules
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## Customization

- Update API endpoints in `src/api/apiService.js` as needed
- Modify nginx.conf for custom server configuration

```bash
# Check logs
docker logs reef-points

# Rebuild without cache
docker build --no-cache -t reef-points-frontend .
```

**Port already in use:**

```bash
# Find what's using the port
netstat -ano | findstr :80

# Use a different port
docker run -d -p 8080:80 reef-points-frontend
```

## License

MIT
