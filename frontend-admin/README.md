# SilanPay Admin Panel

Modern admin dashboard for managing SilanPay users and monitoring system health.

## Features

- ✅ Secure admin authentication with secret code
- ✅ User management (view, activate/deactivate, delete)
- ✅ Dashboard with real-time statistics
- ✅ Search and filter users
- ✅ Responsive design (mobile + desktop)
- ✅ API key protection
- ✅ Role-based access control

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router v6
- TanStack Query (React Query)
- Axios
- React Hot Toast
- Lucide React Icons
- Recharts (for future analytics)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` file from `.env.example`:

   ```bash
   copy .env.example .env
   ```

3. Update `.env` with your backend API URL and admin API key

4. Start development server:

   ```bash
   npm run dev
   ```

   Opens at http://localhost:5174

5. Build for production:
   ```bash
   npm run build
   ```

## Admin Login

To log in as admin, you need:

1. Admin email (set in backend)
2. Admin password
3. Admin secret code (set in backend ADMIN_SECRET_CODE)

## Deployment

### Vercel

1. Connect GitHub repository
2. Set environment variables:
   - `VITE_API_URL`: Your backend API URL
   - `VITE_ADMIN_API_KEY`: Your admin API key
3. Deploy from main branch

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables (same as Vercel)

## Project Structure

```
frontend-admin/
├── src/
│   ├── components/
│   │   ├── DashboardLayout.jsx  # Main layout with sidebar
│   │   └── ProtectedRoute.jsx   # Auth protection
│   ├── pages/
│   │   ├── LoginPage.jsx        # Admin login
│   │   ├── DashboardPage.jsx    # Dashboard with stats
│   │   ├── UsersPage.jsx        # User management
│   │   └── SettingsPage.jsx     # Admin settings
│   ├── services/
│   │   └── api.js               # API client with interceptors
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Security Features

1. **JWT Authentication**: Token-based authentication
2. **API Key Protection**: Admin routes require API key header
3. **Protected Routes**: Redirect to login if not authenticated
4. **Token Expiry Handling**: Auto logout on token expiration
5. **Secure Storage**: Tokens stored in localStorage (consider httpOnly cookies for production)

## Environment Variables

| Variable           | Description          | Example                   |
| ------------------ | -------------------- | ------------------------- |
| VITE_API_URL       | Backend API base URL | http://localhost:5000/api |
| VITE_ADMIN_API_KEY | Admin API key        | your_admin_api_key        |

## Available Scripts

- `npm run dev` - Start development server (port 5174)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
