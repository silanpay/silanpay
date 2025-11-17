# Admin Portal Access Guide

## How to Access the Admin Portal

The admin portal is located at: **http://localhost:5176** (or the port assigned by Vite)

---

## Required Credentials

To log in to the admin portal, you need **THREE** items:

### 1. **Admin Email**
```
admin@silanpay.com
```

### 2. **Admin Password**
```
Admin@123456
```

### 3. **Admin Access Code** (Special Security Layer)
```
ADMIN2024SECRET
```

---

## Step-by-Step Login Process

1. **Navigate to Admin Portal**
   - Open your browser and go to `http://localhost:5176`
   - You will see the Admin Portal login page

2. **Enter Admin Email**
   - Enter: `admin@silanpay.com`

3. **Enter Admin Password**
   - Enter: `Admin@123456`

4. **Enter Admin Access Code**
   - Enter: `ADMIN2024SECRET`
   - This is a special security code required for admin access

5. **Click "Sign In"**
   - The system will validate all credentials
   - If valid, you'll be redirected to the admin dashboard

---

## Understanding the Security Layers

### Layer 1: API Key (`x-api-key`)
- **Location**: Backend verification
- **Current Value**: `silanpay_admin_secret_key_2024`
- **Purpose**: Verifies the frontend is authorized to make admin requests
- **Auto-handled**: The frontend automatically includes this in all requests

### Layer 2: Admin Email & Password
- **Purpose**: Standard authentication
- **Email**: `admin@silanpay.com`
- **Password**: `Admin@123456`

### Layer 3: Admin Access Code
- **Purpose**: Additional security gate
- **Code**: `ADMIN2024SECRET`
- **Required**: Must be entered during login

---

## Where to Find These Credentials

### In the Code:
- **Frontend**: `/frontend-admin/.env`
- **Backend**: `/backend/.env`

### Environment Variables:

#### Frontend-Admin (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_API_KEY=silanpay_admin_secret_key_2024
VITE_ADMIN_EMAIL=admin@silanpay.com
VITE_ADMIN_PASSWORD=Admin@123456
VITE_ADMIN_SECRET=ADMIN2024SECRET
```

#### Backend (`.env`)
```env
PORT=5000
ADMIN_API_KEY=silanpay_admin_secret_key_2024
ADMIN_EMAIL=admin@silanpay.com
ADMIN_PASSWORD=Admin@123456
ADMIN_SECRET=ADMIN2024SECRET
```

---

## Changing Admin Credentials

### To Change Credentials:

1. **Update Backend `.env`**
   ```env
   ADMIN_EMAIL=newemail@silanpay.com
   ADMIN_PASSWORD=NewPassword@123
   ADMIN_SECRET=NEWCODESECRET
   ```

2. **Update Frontend `.env`**
   ```env
   VITE_ADMIN_EMAIL=newemail@silanpay.com
   VITE_ADMIN_PASSWORD=NewPassword@123
   VITE_ADMIN_SECRET=NEWCODESECRET
   ```

3. **Restart Both Servers**
   - Backend: `node ./index.js`
   - Frontend: `npm run dev`

---

## Test Credentials Summary

| Field | Value |
|-------|-------|
| **Email** | `admin@silanpay.com` |
| **Password** | `Admin@123456` |
| **Access Code** | `ADMIN2024SECRET` |
| **API Key** | `silanpay_admin_secret_key_2024` |

---

## Troubleshooting

### "Invalid admin access code"
- Check that you entered: `ADMIN2024SECRET`
- Ensure `.env` files are saved
- Restart both servers

### "Invalid email or password"
- Email must be: `admin@silanpay.com`
- Password must be: `Admin@123456`
- Check for typos and spaces

### "Network error. Please check if backend is running"
- Verify backend is running on port 5000
- Run: `curl http://localhost:5000/api/admin/stats -H "x-api-key: silanpay_admin_secret_key_2024"`

### Token expires after login
- Tokens are valid for the session
- Log out and log in again if needed

---

## Admin Portal Features (After Login)

Once logged in, you can:
- ✅ View dashboard statistics
- ✅ Manage users (list, view, edit, delete)
- ✅ Toggle user status (active/inactive)
- ✅ Monitor transactions
- ✅ View analytics and reports

---

## Security Best Practices

⚠️ **Important for Production:**

1. **Change Default Credentials**
   - Never use default credentials in production
   - Use strong, unique passwords

2. **Use Environment Variables**
   - Store credentials in secure `.env` files
   - Never commit `.env` to version control

3. **Enable HTTPS**
   - Use HTTPS in production
   - Update API URLs accordingly

4. **Implement Real JWT**
   - Replace demo tokens with real JWT tokens
   - Add expiration times

5. **Add Rate Limiting**
   - Prevent brute force attacks
   - Limit login attempts

6. **Database Integration**
   - Connect to MongoDB for persistent storage
   - Hash passwords using bcrypt

---

## Need Help?

- **Backend Issues**: Check `/backend/index.js`
- **Frontend Issues**: Check `/frontend-admin/src/pages/LoginPage.jsx`
- **Configuration**: Check `.env` files in both folders
- **API Documentation**: See endpoint comments in `index.js`
