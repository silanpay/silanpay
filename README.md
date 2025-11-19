# SilanPay - Modern Payment Gateway Platform

Welcome to SilanPay, a comprehensive payment gateway solution with microservices architecture.

## 📚 Documentation

- **User Documentation:** [`USER_DOCUMENTATION.md`](USER_DOCUMENTATION.md) - Complete guide for users, registration, and payment features
- **Admin Documentation:** [`ADMIN_DOCUMENTATION.md`](ADMIN_DOCUMENTATION.md) - Complete guide for administrators, user management, and analytics

## 🚀 Quick Start

```powershell
# Deploy all services
.\deploy.ps1

# Stop all services
.\stop-all.ps1
```

## 🌐 Services

- **User Backend**: http://localhost:5000 - User authentication & payment API
- **Admin Backend**: http://localhost:5001 - Admin management API
- **User Frontend**: http://localhost:5173 - User portal
- **Admin Frontend**: http://localhost:5174 - Admin dashboard

## 🔑 Default Admin Credentials

```
Username: admin
Password: Admin@123
Secret Code: SILANPAY2025
```

> ⚠️ **Change default credentials immediately after first login!**

## 📋 Features

### User Portal

- 3-step OTP registration
- Email verification
- KYC verification
- UPI payments
- Payment gateway
- Smart checkout
- Wallet services
- Payouts
- API & SDKs

### Admin Portal

- User management (CRUD)
- Dashboard analytics
- Transaction monitoring
- Real-time statistics
- Bulk user actions
- Activity logs
- Export reports

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React 18 + Vite
- **Database:** MongoDB Atlas
- **Authentication:** JWT + OTP
- **Email:** Nodemailer (Gmail SMTP)
- **Styling:** Tailwind CSS v3

## 📦 Installation

1. Clone repository
2. Run `.\deploy.ps1`
3. Access user portal at http://localhost:5173
4. Access admin portal at http://localhost:5174

For detailed setup instructions, see [`USER_DOCUMENTATION.md`](USER_DOCUMENTATION.md) and [`ADMIN_DOCUMENTATION.md`](ADMIN_DOCUMENTATION.md)

- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT
- **Security**: Helmet, CORS, bcryptjs
- **Validation**: Express Validator
- **Rate Limiting**: Express Rate Limit

---

## 📁 Project Structure

```
silanpay/
│
├── frontend/                    # User-facing website (Vite + React)
│   ├── public/
│   │   ├── silanpaylogo.png
│   │   └── Terms & Condition.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable components
│   │   │   └── layout/          # Layout components
│   │   ├── context/             # React Context (Auth, Payment, Theme)
│   │   ├── pages/               # Page components
│   │   ├── styles/              # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── frontend-admin/              # Admin dashboard (CRA + React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── backend/                     # Node.js/Express API
│   ├── config/
│   │   └── database.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── payment.js
│   │   └── admin.js
│   ├── scripts/
│   │   └── createAdmin.js
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md                    # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: v16+ ([Download](https://nodejs.org/))
- **MongoDB**: v5+ ([Download](https://www.mongodb.com/try/download/community))
- **Git**: Latest version
- **npm** or **yarn**: Package manager

### Clone Repository

```bash
git clone https://github.com/yourusername/silanpay.git
cd silanpay
```

---

## ⚙️ Configuration

### 1. Backend Configuration

Create `backend/.env`:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/silanpay

# JWT Secret (Change in production)
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# API Keys
API_KEY=your_api_key_for_admin_panel

# Payment Gateway Credentials (Add your keys)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:3000
```

### 2. Frontend Configuration

Create `frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_KEY=your_api_key_for_admin_panel

# Environment
VITE_ENVIRONMENT=development

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_LOGS=true
```

### 3. Frontend-Admin Configuration

Create `frontend-admin/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_KEY=your_api_key_for_admin_panel

# Admin Security
VITE_ADMIN_SECRET=ADMIN2024SECRET

# Demo Credentials (Development Only)
VITE_DEMO_ADMIN_EMAIL=admin@example.com
VITE_DEMO_ADMIN_PASSWORD=Admin@123456

# Security Settings
VITE_SESSION_TIMEOUT=3600000
VITE_MAX_LOGIN_ATTEMPTS=5

# Feature Flags
VITE_ENABLE_2FA=false
VITE_ENABLE_ANALYTICS=true
```

---

## 🏃 Running the Application

### Method 1: Manual Start (Recommended for Development)

#### Terminal 1: Start MongoDB

```bash
# Windows
mongod

# Mac/Linux
sudo service mongodb start
```

#### Terminal 2: Start Backend

```bash
cd backend
npm install
node scripts/createAdmin.js  # Create admin user (first time only)
npm run dev
```

Backend will run at: `http://localhost:5000`

#### Terminal 3: Start Frontend (User Portal)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

#### Terminal 4: Start Admin Panel

```bash
cd frontend-admin
npm install
npm start
```

Admin Panel will run at: `http://localhost:3000`

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. User Registration

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "1234567890"
}
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

#### 2. User Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### 3. Admin Login

```http
POST /api/auth/admin-login
Content-Type: application/json
x-api-key: your_api_key

{
  "email": "admin@example.com",
  "password": "Admin@123456"
}
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "admin_id",
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  },
  "token": "admin_jwt_token"
}
```

### Payment Endpoints

#### 1. Create Payment

```http
POST /api/payment/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "orderId": "ORD123",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+911234567890"
  }
}
```

#### 2. Get Payment Status

```http
GET /api/payment/:paymentId
Authorization: Bearer <token>
```

#### 3. Process Refund

```http
POST /api/payment/refund
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentId": "payment_123",
  "amount": 500,
  "reason": "Customer request"
}
```

### Admin Endpoints

#### 1. Get Dashboard Stats

```http
GET /api/admin/stats
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "totalUsers": 150,
  "totalAdmins": 5,
  "totalRevenue": 50000,
  "activeTransactions": 25
}
```

#### 2. Get All Users

```http
GET /api/admin/users
Authorization: Bearer <admin_token>
```

#### 3. Get All Transactions

```http
GET /api/admin/transactions?page=1&limit=50
Authorization: Bearer <admin_token>
```

---

## 🎨 Admin Panel

### Access Credentials

**Default Admin Account:**

```
Email:      admin@example.com
Password:   Admin@123456
Admin Code: ADMIN2024SECRET
```

**⚠️ Important**: Change these credentials before deploying to production!

### Admin Features

#### Dashboard

- Real-time statistics
- Transaction overview
- Revenue analytics
- User activity monitoring

#### User Management

- View all users
- Edit user details
- Change user roles (admin/user)
- Suspend/activate accounts
- Delete users

#### Transaction Management

- View all transactions
- Filter by status, date, amount
- Transaction details
- Process refunds
- Export reports

#### Settings

- Payment gateway configuration
- API key management
- Webhook configuration
- Email templates
- System settings

### Creating Additional Admins

#### Method 1: Using Script

```bash
cd backend
node scripts/createAdmin.js
```

#### Method 2: Using MongoDB

```javascript
// Connect to MongoDB and run:
db.users.insertOne({
  name: "New Admin",
  email: "newadmin@example.com",
  password: "$2a$10$hashedPasswordHere",
  role: "admin",
  phone: "1234567890",
  isVerified: true,
  createdAt: new Date(),
});
```

---

## 🎯 Frontend Features

### User Portal (`http://localhost:5173`)

#### Public Pages

- **Landing Page**: Hero section, features, pricing
- **About Us**: Company information, mission, values
- **Contact Us**: Contact form, location map
- **UPI Payment**: UPI payment information
- **Terms & Conditions**: Legal terms
- **Privacy Policy**: Privacy information
- **Refund Policy**: Refund terms

#### Protected Pages (After Login)

- **Dashboard**: User dashboard
- **Payment History**: Transaction history
- **Payment Gateway**: Create payments
- **Payment Status**: Check payment status
- **Documentation**: API documentation
- **Support**: Help and support

#### Authentication Pages

- **Login**: User login
- **Register**: User registration
- **Forgot Password**: Password recovery
- **Reset Password**: Set new password

### Key Components

#### Header Navigation

```jsx
// Dynamic navigation with dropdowns
- Products (UPI, Cards, QR, etc.)
- Developers (API, SDK, Webhooks)
- About Us
- Login/Register (or User Menu after login)
```

#### Payment Flow

1. User selects payment method
2. Enters payment details
3. System validates and processes
4. Real-time status updates
5. Success/failure notification
6. Receipt generation

---

## 🔒 Security

### Implementation

#### Password Security

```javascript
// bcryptjs for password hashing
const bcrypt = require("bcryptjs");
const hashedPassword = await bcrypt.hash(password, 10);
```

#### JWT Authentication

```javascript
// Generate JWT token
const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "30d" }
);
```

#### CORS Configuration

```javascript
// Allow specific origins
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
```

#### Rate Limiting

```javascript
// Prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);
```

### Security Best Practices

1. ✅ Always use HTTPS in production
2. ✅ Implement rate limiting
3. ✅ Validate all user inputs
4. ✅ Use environment variables for secrets
5. ✅ Implement CSRF protection
6. ✅ Regular security audits
7. ✅ Keep dependencies updated
8. ✅ Implement proper error handling
9. ✅ Use security headers (Helmet)
10. ✅ Log all security events

---

## 🚢 Deployment

### Prerequisites

- Domain name
- SSL certificate
- Server (VPS/Cloud)
- MongoDB Atlas (or hosted MongoDB)

### Backend Deployment

#### 1. Prepare Environment

```bash
# Update .env for production
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/silanpay
JWT_SECRET=your_production_secret
FRONTEND_URL=https://yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
```

#### 2. Build & Deploy

```bash
cd backend
npm install --production
npm start
```

#### 3. Process Manager (PM2)

```bash
npm install -g pm2
pm2 start server.js --name silanpay-backend
pm2 save
pm2 startup
```

### Frontend Deployment

#### Build for Production

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

#### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Admin Panel Deployment

```bash
cd frontend-admin
npm run build
# Deploy dist/ folder to hosting
```

### Environment Variables (Production)

**Backend:**

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=production_secret_key
API_KEY=production_api_key
```

**Frontend:**

```env
VITE_API_URL=https://api.yourdomain.com
VITE_API_KEY=production_api_key
VITE_ENVIRONMENT=production
```

**Admin:**

```env
VITE_API_URL=https://api.yourdomain.com
VITE_API_KEY=production_api_key
VITE_ADMIN_SECRET=production_admin_secret
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend not starting

```bash
# Check MongoDB is running
mongod --version

# Check port 5000 is free
netstat -ano | findstr :5000

# Check .env file exists
ls backend/.env
```

#### 2. CORS errors

```javascript
// Update CORS configuration in server.js
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
};
```

#### 3. MongoDB connection error

```bash
# Verify MongoDB URI
# Check MongoDB is running
# Verify network access in MongoDB Atlas
```

#### 4. Frontend build errors

```bash
# Clear cache
npm run clean
rm -rf node_modules
npm install

# Check .env variables are prefixed with VITE_
```

---

## 📝 Development Guidelines

### Code Style

#### JavaScript/JSX

- Use ES6+ features
- Follow Airbnb style guide
- Use functional components
- Implement proper error handling

#### CSS

- Use Tailwind utility classes
- Follow BEM naming for custom CSS
- Implement responsive design
- Use CSS variables for theming

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/payment-integration

# Make changes and commit
git add .
git commit -m "feat: add payment integration"

# Push to remote
git push origin feature/payment-integration

# Create Pull Request
```

### Commit Messages

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

---

## 📊 Performance Optimization

### Frontend

- Code splitting with React.lazy()
- Image optimization
- Lazy loading
- Memoization (React.memo, useMemo)
- Virtual scrolling for large lists

### Backend

- Database indexing
- Caching (Redis)
- Compression (gzip)
- Query optimization
- Load balancing

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clean, maintainable code
- Follow the existing code style
- Add tests for new features
- Update documentation
- Create meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 SilanPay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📧 Support

For support and queries:

- **Email**: support@example.com
- **Documentation**: [docs.example.com](https://docs.example.com)
- **GitHub Issues**: [github.com/yourusername/silanpay/issues](https://github.com/yourusername/silanpay/issues)

---

## 🙏 Acknowledgments

- React Team for the amazing framework
- MongoDB for the database
- Tailwind CSS for the utility-first CSS
- All contributors and supporters

---

## 📈 Roadmap

### Version 2.0 (Q2 2025)

- [ ] Mobile App (React Native)
- [ ] Payment Subscriptions
- [ ] Multi-currency Support
- [ ] Advanced Analytics
- [ ] AI-powered Fraud Detection

### Version 2.1 (Q3 2025)

- [ ] Cryptocurrency Support
- [ ] International Payments
- [ ] White Label Solution
- [ ] Advanced Reporting

---

## 🔗 Links

- **Website**: [https://example.com](https://example.com)
- **Documentation**: [https://docs.example.com](https://docs.example.com)
- **Blog**: [https://blog.example.com](https://blog.example.com)
- **GitHub**: [https://github.com/yourusername/silanpay](https://github.com/yourusername/silanpay)

---

<div align="center">

**Built with ❤️ by the SilanPay Team**

[⭐ Star us on GitHub](https://github.com/yourusername/silanpay) | [🐛 Report Bug](https://github.com/yourusername/silanpay/issues) | [✨ Request Feature](https://github.com/yourusername/silanpay/issues)

</div>##  Installation

1. Clone repository
2. Run `.\deploy.ps1`
3. Access user portal at http://localhost:5173
4. Access admin portal at http://localhost:5174

For detailed setup instructions, see [`USER_DOCUMENTATION.md`](USER_DOCUMENTATION.md) and [`ADMIN_DOCUMENTATION.md`](ADMIN_DOCUMENTATION.md)
