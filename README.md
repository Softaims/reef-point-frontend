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
- Tailwind CSS for styling
- Zod for form validation
- Axios for API requests
- Lucide React for icons
- @reef-chain/ui-kit for wallet and UI components

## Environment Setup

Before running the project, create a `.env` file in the root directory and add the following environment variable:

```
VITE_API_BASE_URL=http://localhost:3004
```

You can set this to your local backend or production API URL as needed.

To clone and run the backend API, visit: [reef-points-backend](https://github.com/abdul745/reef-points-backend)

## Getting Started

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

## Project Structure

- `src/pages/` — Main pages (Dashboard, Campaigns, Auth, etc.)
- `src/components/` — Reusable UI and dashboard components
- `src/api/` — API service layer
- `src/assets/` — Images and static assets

## Customization

- Update API endpoints in `src/api/apiService.js` as needed
- Edit Tailwind config for custom theming

## License

MIT
