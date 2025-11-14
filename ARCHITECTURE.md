# 🏗️ SilanPay Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        SILANPAY PLATFORM                         │
│                  Full-Stack Payment Gateway                      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│   USER FRONTEND  │         │   ADMIN PANEL    │
│   (Port 5173)    │         │   (Port 5174)    │
│                  │         │                  │
│  • Landing Page  │         │  • Dashboard     │
│  • Register/Login│         │  • User Mgmt     │
│  • Dashboard     │         │  • Analytics     │
│  • Payment Pages │         │  • Settings      │
│                  │         │                  │
│  React + Vite    │         │  React + Vite    │
│  Tailwind CSS    │         │  Tailwind CSS    │
└────────┬─────────┘         └────────┬─────────┘
         │                            │
         │  HTTP/REST API             │  HTTP/REST + API Key
         │                            │
         └────────────┬───────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │   BACKEND API SERVER   │
         │     (Port 5000)        │
         │                        │
         │  • Auth Routes         │
         │  • Admin Routes        │
         │  • User Management     │
         │  • JWT Verification    │
         │  • API Key Protection  │
         │  • Rate Limiting       │
         │                        │
         │  Express.js + Node     │
         │  Security: Helmet/CORS │
         └───────────┬────────────┘
                     │
                     │  Mongoose ODM
                     │
                     ▼
         ┌────────────────────────┐
         │   MongoDB DATABASE     │
         │                        │
         │  Collections:          │
         │  • users               │
         │  • sessions            │
         │  • transactions        │
         │                        │
         │  MongoDB Atlas / Local │
         └────────────────────────┘
```

---

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       SECURITY LAYERS                            │
└─────────────────────────────────────────────────────────────────┘

Layer 1: Network
├─ Cloudflare WAF (optional)
├─ DDoS Protection
└─ Rate Limiting (100 req/15min)

Layer 2: Transport
├─ HTTPS/TLS 1.3
├─ SSL Certificates (Let's Encrypt)
└─ Secure Headers (Helmet)

Layer 3: Authentication
├─ JWT Tokens (7d user, 24h admin)
├─ bcrypt Password Hashing (12 rounds)
├─ Admin Secret Code
└─ API Key Protection

Layer 4: Authorization
├─ Role-Based Access (user/admin)
├─ Protected Routes
└─ Middleware Verification

Layer 5: Data
├─ MongoDB Encryption at Rest
├─ Secure Connection Strings
└─ No Sensitive Data in Logs
```

---

## 📊 Request Flow

### User Registration Flow

```
Frontend (Register Page)
    ↓ POST /api/auth/register
    ↓ { name, email, password }
Backend Server
    ↓ Validate Input
    ↓ Check Duplicate Email
    ↓ Hash Password (bcrypt)
    ↓ Generate API Key
    ↓ Save to MongoDB
    ↓ Generate JWT Token
Frontend
    ↓ Store Token in localStorage
    ↓ Redirect to Dashboard
```

### Admin Login Flow

```
Admin Panel (Login Page)
    ↓ POST /api/auth/admin-login
    ↓ { email, password, adminCode }
Backend Server
    ↓ Verify Admin Secret Code
    ↓ Find Admin User (role='admin')
    ↓ Verify Password (bcrypt)
    ↓ Generate JWT Token (24h)
Admin Panel
    ↓ Store Token in localStorage
    ↓ Redirect to Dashboard
```

### Admin API Request Flow

```
Admin Panel (Users Page)
    ↓ GET /api/admin/users
    ↓ Headers:
    │   Authorization: Bearer <JWT>
    │   x-api-key: <ADMIN_API_KEY>
Backend Middleware Chain
    ↓ verifyApiKey()
    │   Check x-api-key header
    │   Compare with ADMIN_API_KEY
    ↓ verifyToken()
    │   Verify JWT signature
    │   Extract user info
    ↓ adminOnly()
    │   Check user.role === 'admin'
Backend Route Handler
    ↓ Query MongoDB
    ↓ Return Users Data
Admin Panel
    ↓ Display in Table
```

---

## 🗂️ File Structure

```
silanpay/
│
├── 📄 README.md                    # Main documentation
├── 📄 DEPLOYMENT.md                # Deployment guide
├── 📄 ARCHITECTURE.md              # This file
├── 🔧 auto-build.ps1               # ONE-CLICK setup
├── 🔧 start-all.ps1                # Start all services
│
├── 📁 backend/                     # Backend API Server
│   ├── 📁 models/
│   │   └── User.js                 # User schema + methods
│   ├── 📁 routes/
│   │   ├── auth.js                 # Auth endpoints
│   │   └── admin.js                # Admin endpoints
│   ├── 📁 middlewares/
│   │   ├── verifyToken.js          # JWT verification
│   │   ├── adminOnly.js            # Role check
│   │   └── verifyApiKey.js         # API key check
│   ├── 📁 config/
│   ├── 📄 server.js                # Main server
│   ├── 📄 package.json             # Dependencies
│   ├── 📄 .env.example             # Environment template
│   ├── 📄 .gitignore
│   └── 📄 README.md
│
├── 📁 frontend/                    # User Frontend
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   ├── LandingPage.jsx     # Main landing
│   │   │   ├── RegisterPage.jsx    # User signup
│   │   │   ├── LoginPage.jsx       # User login
│   │   │   ├── Dashboard.jsx       # User dashboard
│   │   │   ├── PaymentGatewayPage.jsx
│   │   │   └── ...
│   │   ├── 📁 components/
│   │   │   ├── 📁 layout/
│   │   │   │   └── Header.jsx      # Navigation
│   │   │   └── 📁 common/
│   │   │       ├── ProtectedRoute.jsx
│   │   │       └── ScrollToTop.jsx
│   │   ├── 📁 context/
│   │   │   ├── AuthContext.jsx     # Auth state
│   │   │   └── PaymentContext.jsx  # Payment state
│   │   ├── 📁 styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── 📁 public/
│   ├── 📄 index.html
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   ├── 📄 .env.example
│   └── 📄 README.md
│
└── 📁 frontend-admin/              # Admin Panel
    ├── 📁 src/
    │   ├── 📁 pages/
    │   │   ├── LoginPage.jsx       # Admin login
    │   │   ├── DashboardPage.jsx   # Admin dashboard
    │   │   ├── UsersPage.jsx       # User management
    │   │   └── SettingsPage.jsx    # Admin settings
    │   ├── 📁 components/
    │   │   ├── DashboardLayout.jsx # Main layout
    │   │   └── ProtectedRoute.jsx  # Auth guard
    │   ├── 📁 services/
    │   │   └── api.js              # API client
    │   ├── App.jsx
    │   └── main.jsx
    ├── 📄 package.json
    ├── 📄 vite.config.js
    ├── 📄 tailwind.config.js
    ├── 📄 .env.example
    └── 📄 README.md
```

---

## 🔄 Data Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required, min: 2),
  email: String (required, unique, lowercase),
  password: String (required, min: 6, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  apiKey: String (unique, sparse),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🌐 API Routes Map

### Public Routes

```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/admin-login       # Admin login (+ secret code)
```

### Protected Routes (JWT Required)

```
GET    /api/auth/me                # Get current user
POST   /api/auth/regenerate-api-key # Regenerate user API key
```

### Admin Routes (JWT + API Key + Admin Role)

```
GET    /api/admin/users            # List all users (paginated)
GET    /api/admin/users/:id        # Get single user
GET    /api/admin/stats            # Dashboard statistics
PATCH  /api/admin/users/:id        # Update user
PATCH  /api/admin/users/:id/toggle-status # Activate/Deactivate
DELETE /api/admin/users/:id        # Delete user
```

### Hidden Routes (API Key Required)

```
GET    /health                     # Backend health check
```

### Blocked Routes

```
GET    /                           # Returns 404 (hidden backend)
```

---

## 🚀 Deployment Architecture

### Development (Local)

```
Frontend:        localhost:5173
Admin Panel:     localhost:5174
Backend API:     localhost:5000
Database:        localhost:27017 (or MongoDB Atlas)
```

### Production

```
┌────────────────────────────────────────────────────────┐
│                    CLOUDFLARE CDN                      │
│              (DNS, SSL, WAF, DDoS Protection)          │
└───────────────────┬────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐       ┌──────────────┐
│   VERCEL     │       │   VERCEL     │
│   Frontend   │       │   Admin      │
│ silanpay.com │       │ admin.      │
│              │       │ silanpay.com │
└──────┬───────┘       └──────┬───────┘
       │                      │
       │    API Calls         │
       │                      │
       └──────────┬───────────┘
                  │
                  ▼
         ┌────────────────┐
         │    RENDER      │
         │  Backend API   │
         │ api.silanpay   │
         │     .com       │
         └────────┬───────┘
                  │
                  ▼
         ┌────────────────┐
         │ MONGODB ATLAS  │
         │   Database     │
         │  (Cloud/Free)  │
         └────────────────┘
```

---

## 📦 Technology Stack Summary

### Backend

- **Runtime:** Node.js 14+
- **Framework:** Express.js 4.18
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcryptjs
- **Security:** Helmet, CORS, Rate Limiting
- **Environment:** dotenv

### Frontend (User)

- **Framework:** React 18.3
- **Build Tool:** Vite 7.1
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router v6
- **State:** React Query, Context API
- **Animations:** GSAP, Framer Motion
- **Icons:** Lucide React

### Admin Panel

- **Framework:** React 18.3
- **Build Tool:** Vite 7.1
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router v6
- **State:** React Query
- **Charts:** Recharts
- **Icons:** Lucide React

### Deployment

- **Frontend Hosting:** Vercel (Free)
- **Backend Hosting:** Render (Free)
- **Database:** MongoDB Atlas (Free M0)
- **CDN/WAF:** Cloudflare (Optional, Free)
- **DNS:** Any registrar

---

## 🔧 Environment Variables Overview

### Backend (.env)

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=<64-char-random>
ADMIN_EMAIL=admin@silanpay.com
ADMIN_SECRET_CODE=<secret>
ADMIN_API_KEY=sk_<random>
FRONTEND_URL=https://silanpay.com
ADMIN_URL=https://admin.silanpay.com
```

### Frontend (.env)

```
VITE_API_URL=https://api.silanpay.com/api
```

### Admin (.env)

```
VITE_API_URL=https://api.silanpay.com/api
VITE_ADMIN_API_KEY=<same-as-backend>
```

---

## 📈 Scalability Considerations

### Current Architecture (Free Tier)

- ✅ Supports 100-1000 users
- ✅ ~100 requests/15min per IP
- ✅ MongoDB Atlas 512MB storage

### Scaling Path

1. **Phase 1:** Increase Render plan ($7/mo)
   - Remove cold starts
   - Better performance
2. **Phase 2:** MongoDB Atlas M10+ ($9/mo)

   - More storage
   - Better performance
   - Backups

3. **Phase 3:** Redis caching
   - Session storage
   - API response caching
4. **Phase 4:** Load balancer

   - Multiple backend instances
   - High availability

5. **Phase 5:** Microservices
   - Separate auth service
   - Separate payment service
   - Message queue (RabbitMQ/SQS)

---

## 🎯 Key Features Implemented

### Security ✅

- JWT authentication
- bcrypt password hashing
- API key protection
- Rate limiting
- CORS whitelist
- Helmet security headers
- Hidden admin panel
- Role-based access

### User Management ✅

- User registration
- User login
- Admin dashboard
- User activation/deactivation
- User deletion
- User search/filter
- Pagination

### Admin Features ✅

- Three-factor admin login
- Dashboard statistics
- User management
- Recent users view
- System information

### Developer Features ✅

- ONE-CLICK setup (auto-build.ps1)
- Comprehensive documentation
- Environment templates
- Deployment guide
- Error handling
- API documentation

---

**📚 For more details, see:**

- [README.md](README.md) - Getting started
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [backend/README.md](backend/README.md) - Backend API docs
- [frontend-admin/README.md](frontend-admin/README.md) - Admin panel docs
