/**
 * Express backend for SilanPay with Admin Panel support.
 * - /api/auth (register/login/admin-login)
 * - /api/projects (list projects)
 * - /api/contact (submit contact)
 * - /api/admin/* (admin protected routes)
 *
 * Fill DB connection (MongoDB) and add auth logic as needed.
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Admin credentials and API Key for frontend-admin authentication
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'silanpay_admin_secret_key_2024';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@silanpay.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123456';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'ADMIN2024SECRET';

// Middleware to verify admin API key
const verifyAdminKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== ADMIN_API_KEY) {
    return res.status(401).json({ ok: false, error: 'Invalid or missing API key' });
  }
  next();
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ ok: false, error: 'No token provided' });
  }
  // In production, verify JWT here using jsonwebtoken
  req.user = { id: 1, email: 'admin@silanpay.com' }; // Demo user
  next();
};

// Simple in-memory store for demo (replace with MongoDB)
const projects = [
  { id: 1, title: 'Demo Project', description: 'Replace with real data' }
];

// Demo users for admin panel
const demoUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'user', createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'user', createdAt: '2024-02-10' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', role: 'user', createdAt: '2024-03-05' },
];

// ===== PUBLIC ROUTES =====

app.get('/api/projects', (req, res) => {
  res.json({ projects });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact received', req.body);
  // In prod: validate + save to DB + send email
  res.json({ ok: true, message: 'Contact received' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Implement real auth and password check
  if (email && password) return res.json({ ok: true, token: 'demo-token' });
  return res.status(400).json({ ok: false, error: 'missing credentials' });
});

app.post('/api/auth/register', (req, res) => {
  // Implement registration and persist user
  return res.json({ ok: true, message: 'registered (demo)' });
});

// ===== ADMIN ROUTES =====

// Admin Login - uses API key
app.post('/api/auth/admin-login', verifyAdminKey, (req, res) => {
  const { email, password, adminCode } = req.body;
  
  // Verify admin code
  if (adminCode !== ADMIN_SECRET) {
    return res.status(403).json({ ok: false, error: 'Invalid admin access code' });
  }
  
  // Verify email and password
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: 'Invalid email or password' });
  }
  
  const adminToken = 'admin-token-' + Date.now(); // In prod, use real JWT
  return res.json({ 
    ok: true, 
    token: adminToken,
    user: { 
      id: 1, 
      email: ADMIN_EMAIL, 
      role: 'admin', 
      name: 'Admin User',
      createdAt: new Date()
    }
  });
});

// Get current admin
app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// Get admin stats
app.get('/api/admin/stats', verifyAdminKey, verifyToken, (req, res) => {
  res.json({
    ok: true,
    stats: {
      totalUsers: 3,
      activeUsers: 2,
      inactiveUsers: 1,
      totalRevenue: 15420.50,
      transactions: 156,
      successRate: 99.8
    }
  });
});

// Get all users (admin only)
app.get('/api/admin/users', verifyAdminKey, verifyToken, (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  
  let filtered = demoUsers;
  if (search) {
    filtered = demoUsers.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json({
    ok: true,
    users: filtered,
    pagination: { page: parseInt(page), limit: parseInt(limit), total: filtered.length }
  });
});

// Get single user (admin only)
app.get('/api/admin/users/:id', verifyAdminKey, verifyToken, (req, res) => {
  const user = demoUsers.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ ok: false, error: 'User not found' });
  }
  res.json({ ok: true, user });
});

// Update user (admin only)
app.patch('/api/admin/users/:id', verifyAdminKey, verifyToken, (req, res) => {
  const user = demoUsers.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ ok: false, error: 'User not found' });
  }
  
  Object.assign(user, req.body);
  res.json({ ok: true, user });
});

// Toggle user status (admin only)
app.patch('/api/admin/users/:id/toggle-status', verifyAdminKey, verifyToken, (req, res) => {
  const user = demoUsers.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ ok: false, error: 'User not found' });
  }
  
  user.status = user.status === 'active' ? 'inactive' : 'active';
  res.json({ ok: true, user });
});

// Delete user (admin only)
app.delete('/api/admin/users/:id', verifyAdminKey, verifyToken, (req, res) => {
  const index = demoUsers.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ ok: false, error: 'User not found' });
  }
  
  const deleted = demoUsers.splice(index, 1);
  res.json({ ok: true, message: 'User deleted', user: deleted[0] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Backend running on', PORT));
