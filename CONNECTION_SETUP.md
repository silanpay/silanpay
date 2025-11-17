# Frontend Admin to Backend Connection Setup

## Overview
The frontend-admin is now successfully connected to the backend. Both services are running and communicating via HTTP API endpoints.

## Servers Running

### Backend Server
- **URL**: http://localhost:5000
- **API Base**: http://localhost:5000/api
- **Main Entry**: `/Users/mdkamranahmad/Desktop/silanpay/backend/index.js`
- **Status**: ✅ Running

### Frontend Admin
- **URL**: http://localhost:5176
- **Dev Port**: 5176 (auto-selected, 5174-5175 were in use)
- **Main Entry**: `/Users/mdkamranahmad/Desktop/silanpay/frontend-admin`
- **Status**: ✅ Running

## Configuration Files

### Backend (`.env`)
```
PORT=5000
ADMIN_API_KEY=silanpay_admin_secret_key_2024
NODE_ENV=development
```
Location: `/Users/mdkamranahmad/Desktop/silanpay/backend/.env`

### Frontend Admin (`.env`)
```
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_API_KEY=silanpay_admin_secret_key_2024
```
Location: `/Users/mdkamranahmad/Desktop/silanpay/frontend-admin/.env`

## API Endpoints Available

### Authentication
- **POST** `/api/auth/admin-login` - Admin login (requires API key)
  - Headers: `x-api-key: silanpay_admin_secret_key_2024`
  - Body: `{ email, password }`

- **GET** `/api/auth/me` - Get current admin user (requires token)
  - Headers: `Authorization: Bearer <token>`

### Admin Dashboard
- **GET** `/api/admin/stats` - Get dashboard statistics
  - Headers: `x-api-key: silanpay_admin_secret_key_2024`, `Authorization: Bearer <token>`

### User Management
- **GET** `/api/admin/users` - List all users
- **GET** `/api/admin/users/:id` - Get single user
- **PATCH** `/api/admin/users/:id` - Update user
- **PATCH** `/api/admin/users/:id/toggle-status` - Toggle user active/inactive
- **DELETE** `/api/admin/users/:id` - Delete user

All admin routes require both:
1. `x-api-key` header with the admin API key
2. `Authorization` header with valid Bearer token

## Frontend Admin API Integration

The frontend-admin automatically:
- Uses the `VITE_API_URL` from `.env` for all API calls
- Includes the `x-api-key` header for admin routes
- Stores `adminToken` in localStorage after login
- Automatically includes the token in all subsequent requests
- Redirects to login on 401 (unauthorized) responses

### API Client Location
`/Users/mdkamranahmad/Desktop/silanpay/frontend-admin/src/services/api.js`

## Testing the Connection

### Test Admin Stats (Backend test)
```bash
curl -X GET http://localhost:5000/api/admin/stats \
  -H "x-api-key: silanpay_admin_secret_key_2024"
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/admin-login \
  -H "x-api-key: silanpay_admin_secret_key_2024" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@silanpay.com","password":"password123"}'
```

## Next Steps

1. **Open Frontend Admin**
   - Navigate to http://localhost:5176
   - You'll see the admin panel UI

2. **Test Login**
   - Use any email/password combination (currently demo authentication)
   - The backend will return a demo token

3. **View Demo Data**
   - The dashboard shows demo stats and user management
   - 3 demo users are available for testing

4. **Production Setup** (when ready)
   - Replace demo authentication with real JWT verification
   - Connect MongoDB database
   - Implement proper password hashing with bcryptjs
   - Use jsonwebtoken for real JWT signing

## Security Notes

⚠️ **Current Status**: Demo mode with hardcoded credentials

For production:
1. Set unique `ADMIN_API_KEY` in environment variables
2. Use proper JWT signing with `jsonwebtoken` package
3. Hash passwords with `bcryptjs` before storing
4. Connect to MongoDB database
5. Implement proper error handling and validation
6. Add rate limiting (already in package.json: express-rate-limit)
7. Use HTTPS instead of HTTP
