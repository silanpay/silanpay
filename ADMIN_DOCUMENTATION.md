# SilanPay - Admin Portal Documentation

## Overview

Complete documentation for the SilanPay Admin Portal - a powerful administration dashboard for managing users, monitoring transactions, and controlling the payment platform.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Admin Authentication](#admin-authentication)
3. [Admin Features](#admin-features)
4. [API Documentation](#api-documentation)
5. [Configuration](#configuration)
6. [Architecture](#architecture)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas access
- Admin secret code
- Admin API key

### Installation

```powershell
# Start all services (including admin)
.\deploy.ps1
```

### Access Admin Portal

- **URL:** http://localhost:5174
- **Admin Backend API:** http://localhost:5001

### Default Credentials

```
Username: admin
Password: Admin@123
Secret Code: SILANPAY2025
```

> ⚠️ **Security:** Change default credentials immediately after first login!

---

## 🔐 Admin Authentication

### Admin Login Process

1. Navigate to http://localhost:5174/login
2. Enter credentials:
   - Username
   - Password
   - Secret Code (SILANPAY2025)
3. Receive JWT token (24-hour expiry)
4. Access admin dashboard

### Login API

```
POST /api/admin/login

Body:
{
  "username": "admin",
  "password": "Admin@123",
  "secretCode": "SILANPAY2025"
}

Response:
{
  "message": "Admin login successful",
  "token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "username": "admin",
    "role": "admin"
  }
}
```

### Security Features

- ✅ 3-factor authentication (username + password + secret code)
- ✅ JWT with 24-hour expiry
- ✅ API key validation
- ✅ Admin-only middleware
- ✅ Rate limiting
- ✅ Session management

---

## 🎯 Admin Features

### Dashboard

- **Total Users:** Real-time count
- **Active Users:** Currently active
- **Total Transactions:** All-time count
- **Revenue:** Total platform revenue
- **Recent Activity:** Latest user actions
- **Growth Charts:** User and transaction trends

### User Management

#### View All Users

- List all registered users
- Search and filter
- Sort by date, status, role
- Pagination support

#### User Details

- Personal information
- KYC documents
- Transaction history
- Account status
- Login history

#### User Actions

- Activate/Deactivate accounts
- Update user information
- Delete users
- Reset passwords
- Verify KYC documents

### Transaction Management

- View all transactions
- Filter by status, date, user
- Export transaction reports
- Refund processing
- Dispute resolution

### Analytics & Reports

- User growth metrics
- Transaction volume
- Revenue analytics
- Geographic distribution
- Payment method trends

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5001/api
Production: https://admin-api.silanpay.com/api
```

### Authentication

All admin endpoints require:

```
Headers:
  Authorization: Bearer <admin_jwt_token>
  x-api-key: <admin_api_key>
```

### Admin Endpoints

#### 1. Admin Login

```
POST /admin/login

Body:
{
  "username": "admin",
  "password": "Admin@123",
  "secretCode": "SILANPAY2025"
}

Response:
{
  "message": "Admin login successful",
  "token": "jwt_token",
  "admin": {
    "id": "admin_id",
    "username": "admin",
    "role": "admin"
  }
}
```

#### 2. Get All Users

```
GET /admin/users
Headers:
  Authorization: Bearer <token>
  x-api-key: <api_key>

Query Parameters:
  ?page=1&limit=20&search=&status=active

Response:
{
  "users": [...],
  "totalUsers": 150,
  "currentPage": 1,
  "totalPages": 8
}
```

#### 3. Get User by ID

```
GET /admin/users/:id
Headers:
  Authorization: Bearer <token>
  x-api-key: <api_key>

Response:
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2025-01-01",
    "profile": { ... }
  }
}
```

#### 4. Update User

```
PUT /admin/users/:id
Headers:
  Authorization: Bearer <token>
  x-api-key: <api_key>

Body:
{
  "isActive": false,
  "role": "premium_user",
  "notes": "Account suspended due to suspicious activity"
}

Response:
{
  "message": "User updated successfully",
  "user": { ... }
}
```

#### 5. Delete User

```
DELETE /admin/users/:id
Headers:
  Authorization: Bearer <token>
  x-api-key: <api_key>

Response:
{
  "message": "User deleted successfully"
}
```

#### 6. Dashboard Statistics

```
GET /admin/stats
Headers:
  Authorization: Bearer <token>
  x-api-key: <api_key>

Response:
{
  "totalUsers": 1523,
  "activeUsers": 842,
  "inactiveUsers": 681,
  "totalTransactions": 45678,
  "totalRevenue": 9876543.50,
  "newUsersToday": 23,
  "newUsersThisWeek": 157,
  "newUsersThisMonth": 642
}
```

#### 7. User Activity Logs

```
GET /admin/users/:id/activity
Headers:
  Authorization: Bearer <token>
  x-api-key: <api_key>

Response:
{
  "activity": [
    {
      "action": "login",
      "timestamp": "2025-01-15T10:30:00Z",
      "ip": "192.168.1.1",
      "device": "Chrome on Windows"
    },
    ...
  ]
}
```

#### 8. Bulk User Actions

```
POST /admin/users/bulk-action
Headers:
  Authorization: Bearer <token>
  x-api-key: <api_key>

Body:
{
  "action": "deactivate",
  "userIds": ["id1", "id2", "id3"]
}

Response:
{
  "message": "Bulk action completed",
  "affectedUsers": 3
}
```

---

## ⚙️ Configuration

### Admin Backend (.env)

```env
# Server
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://silanpay2025:mLIuHSi7QxZtPSBm@silanpay.jiu9udo.mongodb.net/SilanPay

# JWT
JWT_SECRET=silanpay_admin_jwt_secret_key_2025_secure_minimum_32_characters
JWT_EXPIRY=24h

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123
ADMIN_SECRET=SILANPAY2025
ADMIN_API_KEY=silanpay_admin_api_key_2025_production_secure

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174

# Security
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### Admin Frontend (.env)

```env
VITE_API_URL=http://localhost:5001
VITE_ADMIN_PORTAL=true
VITE_APP_NAME=SilanPay Admin
VITE_APP_VERSION=1.0.0
```

---

## 🏗️ Architecture

### Microservices Structure

```
SilanPay Platform
├── User Services (Port 5000 & 5173)
│   ├── User authentication
│   ├── Payment processing
│   ├── Transaction management
│   └── User dashboard
│
└── Admin Services (Port 5001 & 5174)
    ├── Admin authentication
    ├── User management
    ├── Analytics dashboard
    └── System monitoring
```

### Admin Backend Structure

```
backend-admin/                # Admin Microservice (Port 5001)
├── server.js                # Express server
├── .env                     # Environment variables
├── package.json
├── config/
│   └── db.js               # MongoDB connection
├── routes/
│   └── admin.js            # Admin routes
├── models/
│   └── User.js             # User model (shared)
├── middlewares/
│   ├── verifyToken.js      # JWT verification
│   ├── adminOnly.js        # Admin role check
│   └── verifyApiKey.js     # API key validation
└── controllers/
    └── adminController.js  # Admin business logic
```

### Admin Frontend Structure

```
frontend-admin/              # Admin Portal (Port 5174)
├── .env
├── package.json
├── CREDENTIALS.md          # Credential information
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── pages/
│   │   ├── AdminLogin.jsx
│   │   ├── Dashboard.jsx
│   │   ├── UserManagement.jsx
│   │   ├── UserDetails.jsx
│   │   ├── Analytics.jsx
│   │   └── Settings.jsx
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── UserTable.jsx
│   │   ├── StatsCard.jsx
│   │   └── Chart.jsx
│   ├── services/
│   │   └── adminApi.js     # API service
│   └── config/
│       └── api.js
```

---

## 🔒 Security & Access Control

### Authentication Layers

1. **Username/Password**

   - Stored with bcrypt hashing
   - 10-round salt

2. **Secret Code**

   - Additional security layer
   - Only known to admins

3. **JWT Token**

   - 24-hour expiry
   - Stored in localStorage
   - Validated on each request

4. **API Key**
   - Required for all admin endpoints
   - Validates in middleware

### Middleware Chain

```javascript
// Example protected route
router.get(
  "/users",
  verifyApiKey, // Step 1: Validate API key
  verifyToken, // Step 2: Validate JWT
  adminOnly, // Step 3: Check admin role
  getAllUsers // Step 4: Execute controller
);
```

### Role-Based Access Control (RBAC)

```javascript
Roles:
- admin (full access)
- super_admin (system config access)
- moderator (limited user management)
```

---

## 🛠️ Troubleshooting

### Admin Login Issues

**Invalid credentials:**

- Verify username: admin
- Verify password: Admin@123
- Check secret code: SILANPAY2025
- Ensure caps lock is off

**Secret code rejected:**

- Check ADMIN_SECRET in backend-admin/.env
- Ensure no extra spaces
- Case-sensitive validation

**Token expired:**

- JWT expires after 24 hours
- Login again to get new token
- Clear localStorage if issues persist

### API Access Issues

**403 Forbidden:**

- Missing x-api-key header
- Invalid API key
- Check ADMIN_API_KEY in .env

**401 Unauthorized:**

- Token expired (24-hour limit)
- Invalid token
- Login again

**500 Server Error:**

- Check backend-admin logs
- Verify MongoDB connection
- Check environment variables

### Port Conflicts

**EADDRINUSE: Port 5001 already in use:**

```powershell
# Stop all services
.\stop-all.ps1

# Restart
.\deploy.ps1
```

### Database Connection Issues

**MongoDB connection failed:**

- Verify MONGO_URI in .env
- Check internet connection
- Verify MongoDB Atlas whitelist
- Test connection string

---

## 📊 Admin Portal Features

### User Management Dashboard

- Real-time user statistics
- User growth charts
- Active/Inactive user ratio
- New registrations tracking

### User Operations

- Search users by name, email, phone
- Filter by status (active/inactive)
- Sort by registration date
- Bulk actions (activate/deactivate/delete)
- Export user data (CSV/Excel)

### Transaction Monitoring

- Real-time transaction feed
- Filter by status, date, amount
- Transaction analytics
- Revenue tracking
- Refund management

### System Monitoring

- Server health status
- API response times
- Error logs
- Database performance
- Concurrent users

### Reports & Analytics

- User demographics
- Geographic distribution
- Payment method preferences
- Revenue trends
- Conversion rates

---

## 🚀 Deployment

### Development Mode

```powershell
# Start all services
.\deploy.ps1

# Access admin portal
http://localhost:5174
```

### Production Mode

```powershell
# Set environment to production
$env:NODE_ENV="production"

# Deploy with production settings
.\deploy.ps1 -Production
```

### Health Checks

```powershell
# Check admin backend
curl http://localhost:5001/health

# Check admin frontend
curl http://localhost:5174
```

---

## 🔍 Monitoring & Logs

### Backend Logs

```powershell
# View admin backend logs
cd backend-admin
npm run logs
```

### Error Tracking

- All errors logged to console
- User actions tracked
- API request/response logged
- Failed login attempts recorded

---

## 📞 Admin Support

For admin technical support:

- **Email:** admin-support@silanpay.com
- **Emergency:** Contact development team
- **Documentation:** This file

---

## 🎯 Admin Workflow

### Daily Tasks

1. Login to admin portal
2. Check dashboard statistics
3. Review new user registrations
4. Monitor transactions
5. Address support tickets
6. Review system health

### User Management Workflow

1. Navigate to User Management
2. Search/Filter users
3. Select user for action
4. View user details
5. Perform action (activate/deactivate/update)
6. Confirm changes

### Transaction Review Workflow

1. Access transaction dashboard
2. Filter by date/status/user
3. Review transaction details
4. Process refunds if needed
5. Update transaction status
6. Generate reports

---

## 🔐 Best Practices

### Security

- ✅ Change default credentials immediately
- ✅ Use strong passwords
- ✅ Keep secret code confidential
- ✅ Rotate API keys regularly
- ✅ Monitor login attempts
- ✅ Enable two-factor authentication (coming soon)

### User Management

- ✅ Verify KYC documents thoroughly
- ✅ Document user actions
- ✅ Regular user audits
- ✅ Backup user data
- ✅ Handle PII with care

### System Maintenance

- ✅ Regular database backups
- ✅ Monitor server performance
- ✅ Update dependencies
- ✅ Review error logs
- ✅ Test new features in staging

---

## 📈 Admin Portal Roadmap

### Upcoming Features

- Two-factor authentication
- Advanced analytics dashboard
- Automated reports
- User behavior tracking
- AI-powered fraud detection
- Mobile admin app
- Real-time notifications
- Audit trail
- Role-based permissions
- API usage analytics

---

## 🆘 Emergency Procedures

### System Down

```powershell
# Stop all services
.\stop-all.ps1

# Check logs
cd backend-admin
npm run logs

# Restart services
cd ..
.\deploy.ps1
```

### Database Issues

```powershell
# Check MongoDB connection
mongosh "mongodb+srv://silanpay2025:mLIuHSi7QxZtPSBm@silanpay.jiu9udo.mongodb.net/SilanPay"

# Verify collections
show collections
db.users.count()
```

### User Lockout

```javascript
// Directly update user in MongoDB
db.users.updateOne({ email: "user@example.com" }, { $set: { isActive: true } });
```

---

## 📝 Admin Credentials Reference

### Default Admin Account

```
Username: admin
Password: Admin@123
Secret Code: SILANPAY2025
API Key: silanpay_admin_api_key_2025_production_secure
```

### Environment Variables

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123
ADMIN_SECRET=SILANPAY2025
ADMIN_API_KEY=silanpay_admin_api_key_2025_production_secure
```

> ⚠️ **Security Notice:** Never commit .env files to version control!

---

**SilanPay Admin Portal - Powerful, Secure, and Efficient Platform Management** 🛡️
