# SilanPay Authentication System - Quick Test Guide

## 🚀 Start All Services (Run these in 3 separate terminals)

### Terminal 1 - Backend:

```powershell
cd backend; npm start
```

### Terminal 2 - Frontend:

```powershell
cd frontend; npm run dev
```

### Terminal 3 - Admin Portal:

```powershell
cd frontend-admin; npm run dev
```

---

## ⚙️ Before Testing - Configure Email

**Edit:** `backend/.env`

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

**Get Gmail App Password:**

1. https://myaccount.google.com/security
2. 2-Step Verification → App passwords
3. Create new app password
4. Copy and paste in .env

---

## 🧪 Test Flow

### 1. Test Registration

- **URL:** http://localhost:5173/register
- **Step 1:** Email + Password
- **Step 2:** Enter OTP from email (6 digits)
- **Step 3:** Fill profile:
  - Phone: 10 digits (e.g., 9876543210)
  - Aadhar: 12 digits (e.g., 123456789012)
  - PAN: ABCDE1234F format
  - Upload photo (max 2MB)
- **Result:** Account created ✅

### 2. Test Login

- **URL:** http://localhost:5173/login
- Use email/password from registration
- **Result:** Dashboard access ✅

### 3. Test Forgot Password

- **URL:** http://localhost:5173/login → "Forgot password?"
- **Step 1:** Enter registered email
- **Step 2:** Enter OTP from email
- **Step 3:** Set new password
- **Result:** Password reset ✅
- Test login with new password

---

## ✅ Quick Checklist

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] EMAIL_USER configured
- [ ] EMAIL_PASSWORD configured
- [ ] Registration works (OTP received)
- [ ] Login works
- [ ] Forgot password works (OTP received)
- [ ] Password reset successful

---

## 🐛 Quick Fixes

**OTP not received?**

- Check spam folder
- Verify EMAIL_USER and EMAIL_PASSWORD in backend/.env
- Restart backend server

**Invalid OTP?**

- OTP expires in 5 minutes
- Request new OTP (resend button)

**Port in use?**

```powershell
# Kill backend (port 5000)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force

# Kill frontend (port 5173)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess -Force
```

---

**See AUTH_SETUP_COMPLETE.md for detailed documentation**
