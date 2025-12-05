# Subscription Billing API

Backend API for Solana Subscription Billing system with secure merchant authentication.

## Features

- **JWT Authentication**: Secure merchant login and registration
- **Plan Management**: Create and update subscription plans
- **Subscription Lifecycle**: Activate, cancel, and check subscription status
- **Analytics**: Comprehensive merchant analytics dashboard

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DATABASE_PATH=./billing.db
NODE_ENV=development
```

## Usage

```bash
# Start the server
npm start

# Development mode with auto-reload
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new merchant
- `POST /auth/login` - Login and get JWT token

### Plans (Requires Authentication)
- `POST /plan/create` - Create a new subscription plan
- `POST /plan/update` - Update an existing plan
- `GET /plan/list` - Get all plans for the merchant

### Subscriptions
- `POST /subscription/activate` - Activate a subscription
- `POST /subscription/cancel` - Cancel a subscription
- `GET /subscription/status` - Get subscription status

### Merchant (Requires Authentication)
- `GET /merchant/analytics` - Get merchant analytics

## Testing

See `test-endpoints.http` for example API calls.
