# 🚀 SilanPay - Complete Setup Guide

## ✅ What's Been Done

### Backend Restructure with esbuild

- ✅ Complete modular folder structure created
- ✅ All credentials moved to `.env` file
- ✅ esbuild configuration for production builds
- ✅ Professional authentication system with OTP
- ✅ Comprehensive error handling
- ✅ Security middleware (helmet, CORS, rate limiting)

### Frontend Configuration

- ✅ Environment variables setup (`.env`)
- ✅ API configuration centralized
- ✅ All auth pages use environment variables
- ✅ Professional UI with Tailwind CSS

### Automation Scripts

- ✅ `start-all.ps1` - Full production build and start
- ✅ `start-dev.ps1` - Quick development mode
- ✅ `stop-all.ps1` - Stop all services

---

## 📁 New Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   ├── email.js          # Nodemailer configuration
│   │   └── constants.js      # App constants and regex
│   ├── controllers/
│   │   └── authController.js # All auth logic
│   ├── middlewares/
│   │   ├── auth.js           # JWT verification, admin check
│   │   └── errorHandler.js   # Global error handling
│   ├── models/
│   │   └── User.js           # User schema with profile
│   ├── routes/
│   │   └── auth.js           # Auth API routes
│   ├── services/
│   │   ├── otpService.js     # OTP generation & verification
│   │   └── emailService.js   # Email sending with templates
│   └── server.js             # Express app configuration
├── dist/                     # Built production code (esbuild output)
├── build.js                  # esbuild configuration
├── package.json              # Updated scripts
└── .env                      # All credentials (NEVER commit!)
```

---

## 🔐 Environment Variables

### Backend `.env` (Required!)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb+srv://silanpay2025:mLIuHSi7QxZtPSBm@silanpay.jiu9udo.mongodb.net/SilanPay

# JWT
JWT_SECRET=silanpay_super_secret_jwt_key_2025_production_ready_minimum_32_chars
JWT_EXPIRY=30d

# Admin
ADMIN_EMAIL=admin@silanpay.com
ADMIN_PASSWORD=Admin@123456
ADMIN_SECRET=ADMIN2024SECRET
ADMIN_API_KEY=silanpay_admin_secret_key_2024

# Email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=silanpay2025@gmail.com
EMAIL_PASSWORD=jaaaxfntxiifxdck
EMAIL_FROM=SilanPay <noreply@silanpay.com>

# CORS
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174

# Security
BCRYPT_ROUNDS=10
OTP_EXPIRY=300000
OTP_MAX_ATTEMPTS=3
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# App
APP_NAME=SilanPay
APP_VERSION=1.0.0
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=SilanPay
VITE_APP_VERSION=1.0.0
```

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```powershell
# Full production build
.\start-all.ps1

# OR Quick development mode
.\start-dev.ps1
```

### Option 2: Manual Setup

#### Backend

```powershell
cd backend

# Install dependencies
npm install

# Development mode (no build)
npm run dev

# OR Production build + start
npm run build
npm start
```

#### Frontend

```powershell
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 📡 API Endpoints

### Registration Flow (3 Steps)

```
POST /api/auth/register/step1
POST /api/auth/register/verify-otp
POST /api/auth/register/resend-otp
POST /api/auth/register/complete
```

### Login

```
POST /api/auth/login
POST /api/auth/admin-login
```

### Password Reset

```
POST /api/auth/forgot-password
POST /api/auth/forgot-password/verify-otp
POST /api/auth/reset-password
```

### Protected Routes

```
GET /api/auth/me (requires Bearer token)
GET /api/auth/verify (requires Bearer token)
```

---

## 🔧 Package.json Scripts

### Backend

```json
{
  "dev": "nodemon src/server.js", // Development with auto-reload
  "build": "node build.js", // Build with esbuild
  "start": "node dist/server.js", // Run production build
  "build:start": "npm run build && npm start"
}
```

### Frontend

```json
{
  "dev": "vite", // Development server
  "build": "vite build", // Production build
  "preview": "vite preview" // Preview production build
}
```

---

## ✅ Testing the Setup

### 1. Check Backend Health

```powershell
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running",
  "environment": "development",
  "version": "1.0.0"
}
```

### 2. Test Registration

```powershell
# Step 1: Send OTP
curl -X POST http://localhost:5000/api/auth/register/step1 `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"test123456"}'
```

### 3. Open Frontend

```
http://localhost:5173
```

Navigate to:

- `/register` - 3-step registration
- `/login` - User login
- `/forgot-password` - Password reset

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'dotenv'"

```powershell
cd backend
npm install
```

### Issue: "Port 5000 already in use"

```powershell
# Kill existing process
Get-Process node | Stop-Process -Force

# OR change port in backend/.env
PORT=5001
```

### Issue: "MongoDB connection failed"

- Check `MONGO_URI` in backend/.env
- Ensure IP is whitelisted in MongoDB Atlas
- Check internet connection

### Issue: "Email not sending"

- Verify `EMAIL_USER` and `EMAIL_PASSWORD` in backend/.env
- Check Gmail app password is correct
- In development, OTP will be returned in API response if email fails

### Issue: Frontend can't connect to backend

- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend/.env
- Clear browser cache
- Check browser console for CORS errors

---

## 🔒 Security Best Practices

### Production Checklist

- [ ] Change `JWT_SECRET` to cryptographically random value
- [ ] Use strong `ADMIN_PASSWORD`
- [ ] Never commit `.env` files to git
- [ ] Use Redis instead of in-memory OTP storage
- [ ] Enable HTTPS/SSL certificates
- [ ] Set `NODE_ENV=production`
- [ ] Use professional email service (SendGrid, AWS SES)
- [ ] Configure proper CORS origins (no localhost)
- [ ] Enable MongoDB authentication
- [ ] Set up monitoring and logging
- [ ] Implement rate limiting per user
- [ ] Add input sanitization
- [ ] Enable database backups

---

## 📚 File Locations

### Important Files

```
backend/.env                              # All credentials
backend/src/server.js                     # Main server file
backend/src/controllers/authController.js # Auth logic
backend/src/services/otpService.js        # OTP management
backend/src/services/emailService.js      # Email templates

frontend/.env                             # Frontend config
frontend/src/config/api.js                # API endpoints
frontend/src/pages/RegisterPage.jsx       # 3-step registration
frontend/src/pages/LoginPage.jsx          # User login
frontend/src/pages/ForgotPasswordPage.jsx # Password reset
frontend/src/context/AuthContext.jsx      # Auth state management
```

---

## 🎯 What Works Now

### Backend

✅ Professional folder structure with separation of concerns
✅ All credentials in `.env` (no hardcoded values)
✅ esbuild bundling for production
✅ Complete OTP-based email verification
✅ Secure password hashing with bcrypt
✅ JWT authentication with proper expiry
✅ Beautiful HTML email templates
✅ Comprehensive error handling
✅ Security middleware (helmet, CORS, rate limiting)
✅ MongoDB connection with retry logic
✅ Graceful shutdown handling

### Frontend

✅ Environment variable configuration
✅ Centralized API endpoint management
✅ 3-step registration with OTP
✅ Forgot password with OTP
✅ User login with JWT
✅ Profile data collection (KYC)
✅ Form validation
✅ Loading states
✅ Error handling
✅ Toast notifications

### Automation

✅ One-command setup with `start-all.ps1`
✅ Quick dev mode with `start-dev.ps1`
✅ Easy cleanup with `stop-all.ps1`
✅ Automatic dependency installation
✅ Build verification
✅ Process management

---

## 📞 Support

If you encounter any issues:

1. Check the console logs in both terminals
2. Verify all `.env` files are present and correct
3. Ensure MongoDB Atlas is accessible
4. Check firewall/antivirus settings
5. Try stopping and restarting: `.\stop-all.ps1` then `.\start-dev.ps1`

---

## 🎉 You're Ready!

Your SilanPay payment gateway is now properly structured and ready for development!

**Next Steps:**

1. Run `.\start-dev.ps1` to start services
2. Open http://localhost:5173 in your browser
3. Test the registration flow
4. Check email for OTP codes
5. Start building additional features!

**Happy Coding! 🚀**
