# SilanPay - User Portal Documentation

## Overview

Complete documentation for the SilanPay User Portal - a modern payment gateway platform with OTP-based authentication, KYC verification, and comprehensive payment solutions.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [User Registration](#user-registration)
3. [Authentication](#authentication)
4. [User Features](#user-features)
5. [API Documentation](#api-documentation)
6. [Configuration](#configuration)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Gmail account for OTP emails

### Installation

```powershell
# Clone repository
git clone https://github.com/silanpay/silanpay.git
cd silanpay

# Start user services
.\deploy.ps1
```

### Access User Portal

- **URL:** http://localhost:5173
- **User Backend API:** http://localhost:5000

---

## 📝 User Registration

### 3-Step Registration Process

#### Step 1: Email & Password

- Enter valid email address
- Create strong password (minimum 6 characters)
- Confirm password

#### Step 2: OTP Verification

- OTP sent to registered email
- 6-digit code valid for 5 minutes
- Maximum 3 attempts allowed
- Resend option available

#### Step 3: Complete Profile & KYC

Required fields:

- **Personal Information:**
  - First Name
  - Last Name
  - Phone Number (10 digits)
- **KYC Documents:**
  - Aadhar Number (12 digits)
  - PAN Number (ABCDE1234F format)
- **Business Details (Optional):**

  - Business Name
  - Business Type
  - Complete Address

- **Photo Upload:**
  - Max 2MB
  - Converted to base64

---

## 🔐 Authentication

### User Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### JWT Token

- **Expiry:** 30 days
- **Storage:** localStorage
- **Header:** `Authorization: Bearer <token>`

### Forgot Password Flow

1. Enter email → OTP sent
2. Verify OTP → 6-digit code
3. Set new password → Password updated

---

## 🎯 User Features

### Dashboard

- Account overview
- Recent transactions
- Quick actions
- Payment history

### Payment Solutions

- **UPI Payments**
- **Payment Gateway**
- **Smart Checkout**
- **QR Code Payments**
- **Sound Box**

### Collection Services

- Digital collections
- Automated reconciliation
- Real-time notifications

### Wallet Services

- Top-up wallet
- Transfer funds
- Transaction history

### Payouts

- Bulk payouts
- Single transfers
- Schedule payments

### API & SDK

- REST API documentation
- SDKs for multiple languages
- Webhooks integration
- Testing environment

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production: https://api.silanpay.com/api
```

### Authentication Endpoints

#### 1. Register - Step 1

```
POST /auth/register/step1

Body:
{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "message": "OTP sent to your email",
  "email": "user@example.com"
}
```

#### 2. Verify OTP

```
POST /auth/register/verify-otp

Body:
{
  "email": "user@example.com",
  "otp": "123456"
}

Response:
{
  "message": "OTP verified successfully"
}
```

#### 3. Resend OTP

```
POST /auth/register/resend-otp

Body:
{
  "email": "user@example.com"
}

Response:
{
  "message": "New OTP sent to your email"
}
```

#### 4. Complete Registration

```
POST /auth/register/complete

Body:
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "aadharNumber": "123456789012",
  "panNumber": "ABCDE1234F",
  "businessName": "My Business",
  "businessType": "Retail",
  "address": "123 Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "photo": "base64_string"
}

Response:
{
  "message": "Registration completed successfully",
  "token": "jwt_token",
  "user": { ... }
}
```

#### 5. User Login

```
POST /auth/login

Body:
{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": { ... }
}
```

#### 6. Forgot Password

```
POST /auth/forgot-password

Body:
{
  "email": "user@example.com"
}

Response:
{
  "message": "Password reset OTP sent to your email"
}
```

#### 7. Verify Reset OTP

```
POST /auth/forgot-password/verify-otp

Body:
{
  "email": "user@example.com",
  "otp": "123456"
}

Response:
{
  "message": "OTP verified. You can now reset your password"
}
```

#### 8. Reset Password

```
POST /auth/reset-password

Body:
{
  "email": "user@example.com",
  "newPassword": "newSecurePassword123"
}

Response:
{
  "message": "Password reset successful"
}
```

#### 9. Get Current User

```
GET /auth/me
Headers: Authorization: Bearer <token>

Response:
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user",
    "profile": { ... }
  }
}
```

#### 10. Verify Token

```
GET /auth/verify
Headers: Authorization: Bearer <token>

Response:
{
  "valid": true,
  "user": { ... }
}
```

---

## ⚙️ Configuration

### User Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://silanpay2025:mLIuHSi7QxZtPSBm@silanpay.jiu9udo.mongodb.net/SilanPay

# JWT
JWT_SECRET=silanpay_super_secret_jwt_key_2025_production_ready_minimum_32_chars
JWT_EXPIRY=30d

# Email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=silanpay2025@gmail.com
EMAIL_PASSWORD=jaaa xfnt xiif xdck

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174

# Security
BCRYPT_ROUNDS=10
OTP_EXPIRY=300000
OTP_MAX_ATTEMPTS=3
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### User Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=SilanPay
VITE_APP_VERSION=1.0.0
```

---

## 🛠️ Troubleshooting

### Registration Issues

**OTP not received:**

- Check spam/junk folder
- Verify email address is correct
- Wait 5 minutes before requesting resend
- Check Gmail SMTP configuration

**OTP verification failed:**

- Ensure OTP is entered correctly
- Check if OTP has expired (5 minutes)
- Maximum 3 attempts allowed
- Request new OTP if needed

**Profile completion failed:**

- Verify all required fields
- Check Aadhar format (12 digits)
- Check PAN format (ABCDE1234F)
- Ensure phone is 10 digits
- Photo must be under 2MB

### Login Issues

**Invalid credentials:**

- Verify email and password
- Check caps lock
- Use forgot password if needed

**Account deactivated:**

- Contact support
- Check email for notifications

### API Errors

**401 Unauthorized:**

- Token expired - login again
- Invalid token - clear localStorage
- Missing token - ensure logged in

**429 Too Many Requests:**

- Rate limit exceeded
- Wait 15 minutes
- Reduce request frequency

**500 Server Error:**

- Check backend logs
- Verify MongoDB connection
- Check environment variables

---

## 🔒 Security Features

- ✅ JWT authentication with 30-day expiry
- ✅ bcrypt password hashing (10 rounds)
- ✅ OTP with 5-minute expiry
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Email verification required
- ✅ KYC verification

---

## 📊 User Portal Structure

```
backend/                      # User Backend (Port 5000)
├── server.js                # Express server
├── .env                     # Environment variables
├── package.json
├── routes/
│   └── auth.js             # Authentication routes
├── models/
│   └── User.js             # User model with KYC
├── middlewares/
│   └── verifyToken.js      # JWT verification
└── utils/

frontend/                    # User Frontend (Port 5173)
├── .env
├── package.json
├── src/
│   ├── pages/
│   │   ├── RegisterPage.jsx      # 3-step registration
│   │   ├── LoginPage.jsx         # User login
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── UPIPaymentPage.jsx
│   │   ├── PaymentGatewayPage.jsx
│   │   ├── SmartCheckoutPage.jsx
│   │   ├── WalletPage.jsx
│   │   └── PayoutsPage.jsx
│   ├── components/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── PaymentContext.jsx
│   └── config/
│       └── api.js
```

---

## 🎯 User Workflow

### New User Journey

1. Visit http://localhost:5173/register
2. Enter email & password
3. Verify OTP from email
4. Complete profile with KYC details
5. Account created → Auto-login
6. Access dashboard

### Returning User

1. Visit http://localhost:5173/login
2. Enter credentials
3. Access dashboard

### Password Reset

1. Click "Forgot Password"
2. Enter email
3. Verify OTP
4. Set new password
5. Login with new password

---

## 📱 Features Available to Users

### Payment Methods

- UPI payments
- Card payments (coming soon)
- Net banking (coming soon)
- Wallet payments

### Services

- Payment gateway integration
- QR code generation
- Sound box for offline payments
- Smart checkout experience
- Bulk payouts
- Collection services

### Developer Tools

- REST API access
- SDKs (Node.js, Python, PHP, Java)
- Webhooks
- Testing environment
- API documentation

### Support

- Help & Support page
- Contact form
- Email support
- Live chat (coming soon)

---

## 🚀 Deployment

### Development

```powershell
.\deploy.ps1
```

### Production

```powershell
.\deploy.ps1 -Production
```

### Stop Services

```powershell
.\stop-all.ps1
```

---

## 📞 Support

For user support and inquiries:

- **Email:** support@silanpay.com
- **Website:** http://localhost:5173/support
- **Documentation:** http://localhost:5173/documentation

---

**SilanPay User Portal - Secure, Fast, and Reliable Payment Solutions** 🚀
