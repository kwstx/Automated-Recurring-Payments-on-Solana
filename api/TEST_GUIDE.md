# API Testing Script

## Prerequisites
- Backend running on port 4000
- SQLite database initialized

## 1. Authentication Tests

### Register a Test Merchant
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testmerchant",
    "password": "testpass123",
    "walletAddress": "TestWallet123ABC"
  }'
```

**Expected Response:**
```json
{
  "message": "Merchant registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testmerchant",
    "password": "testpass123"
  }'
```

**Save the token for subsequent requests:**
```bash
export TOKEN="<your-jwt-token-here>"
```

## 2. Plan Management Tests

### Create a Plan
```bash
curl -X POST http://localhost:4000/plan/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "planPda": "TestPlanPDA123",
    "name": "Premium Plan",
    "description": "Premium tier subscription",
    "amount": 29990000,
    "currency": "USDC",
    "interval": "monthly"
  }'
```

### List All Plans
```bash
curl -X GET http://localhost:4000/plan/list \
  -H "Authorization: Bearer $TOKEN"
```

### List Plans with Pagination
```bash
curl -X GET "http://localhost:4000/plan/list-paginated?page=1&limit=10&search=Premium" \
  -H "Authorization: Bearer $TOKEN"
```

### Delete a Plan
```bash
curl -X DELETE http://localhost:4000/plan/1 \
  -H "Authorization: Bearer $TOKEN"
```

## 3. Analytics Tests

### Get MRR
```bash
curl -X GET http://localhost:4000/merchant/analytics/mrr \
  -H "Authorization: Bearer $TOKEN"
```

### Get Churn Rate
```bash
curl -X GET http://localhost:4000/merchant/analytics/churn \
  -H "Authorization: Bearer $TOKEN"
```

### Get Revenue by Plan
```bash
curl -X GET http://localhost:4000/merchant/analytics/revenue-by-plan \
  -H "Authorization: Bearer $TOKEN"
```

### Export Analytics CSV
```bash
curl -X GET http://localhost:4000/merchant/analytics/export \
  -H "Authorization: Bearer $TOKEN" \
  -o analytics-export.csv
```

## 4. Settings Tests

### Get Company Details
```bash
curl -X GET http://localhost:4000/settings/company \
  -H "Authorization: Bearer $TOKEN"
```

### Update Company Details
```bash
curl -X PUT http://localhost:4000/settings/company \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "companyName": "Acme Corp",
    "companyWebsite": "https://acme.com",
    "supportEmail": "support@acme.com",
    "brandColor": "#6366F1"
  }'
```

### Generate API Key
```bash
curl -X POST http://localhost:4000/settings/api-keys/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Production Key"
  }'
```

### List API Keys
```bash
curl -X GET http://localhost:4000/settings/api-keys \
  -H "Authorization: Bearer $TOKEN"
```

### Update Notification Preferences
```bash
curl -X PUT http://localhost:4000/settings/notifications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "notificationNewSub": true,
    "notificationPaymentFailed": true,
    "notificationWeeklySummary": false
  }'
```

## 5. Portal Tests (No Auth Required)

### Get Subscriptions for Wallet
```bash
curl -X GET http://localhost:4000/portal/subscriptions/TestWallet123ABC
```

### Pause Subscription
```bash
curl -X POST http://localhost:4000/portal/subscriptions/1/pause \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "TestWallet123ABC"
  }'
```

### Resume Subscription
```bash
curl -X POST http://localhost:4000/portal/subscriptions/1/resume \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "TestWallet123ABC"
  }'
```

### Cancel Subscription
```bash
curl -X POST http://localhost:4000/portal/subscriptions/1/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "TestWallet123ABC"
  }'
```

## 6. Health Check
```bash
curl -X GET http://localhost:4000/health
```

## Expected Behaviors

### Success Scenarios
- All endpoints return 200/201 status codes
- JWT token is valid for authenticated requests
- Data persists in SQLite database
- Analytics calculations are accurate
- CSV export downloads successfully

### Error Scenarios
- 401 for missing/invalid JWT tokens
- 404 for non-existent resources
- 400 for invalid request data
- 409 for duplicate plan PDAs

## Frontend Testing

### Test in Browser
1. Navigate to `http://localhost:3000`
2. Login with test merchant credentials
3. Verify Plans page shows created plans
4. Check Analytics page displays MRR, churn, revenue
5. Test CSV export button
6. Verify Settings page loads company details
7. Test API key generation
8. Navigate to Portal at `http://localhost:3000/portal`

### Expected Frontend Behavior
- Loading spinners appear during data fetch
- Error messages display on API failures
- Data updates after mutations (create, update, delete)
- React Query cache invalidates correctly
- JWT token persists in localStorage
