/**
 * Minimal Express backend skeleton for the converted frontend.
 * - /api/auth (register/login)
 * - /api/projects (list projects)
 * - /api/contact (submit contact)
 *
 * Fill DB connection (MongoDB) and add auth logic as needed.
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple in-memory store for demo (replace with MongoDB)
const projects = [
  { id: 1, title: 'Demo Project', description: 'Replace with real data' }
];

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Backend running on', PORT));
