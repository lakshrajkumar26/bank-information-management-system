# Banking Platform

A modern banking platform built with React, Node.js, and MongoDB.

## Features

- 🔐 User authentication with JWT
- 🏦 Bank account management
- 👥 Role-based access control (Admin, Manager, User)
- 📊 Admin dashboard with analytics
- 🔍 Advanced search and filtering
- 📱 Responsive design
- ✅ Real-time form validation

## Tech Stack

### Frontend
- React 19 with Vite
- Material-UI for components
- React Router for navigation
- Axios for API calls
- Zod for validation
- React Toastify for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

## Prerequisites

- Node.js >= 16.0.0
- MongoDB database
- npm or yarn

## Environment Variables

### Backend (.env)
```env
# MongoDB Connection String
MONGO_URL=mongodb://localhost:27017/banking_platform

# JWT Secret Key (Change this to a secure random string)
JWT_SECRET=your_jwt_secret_key_here

# Server Port (Optional, defaults to 3000)
PORT=3000

# Frontend URL for CORS (Production)
FRONTEND_URL=https://your-frontend-domain.com

# Environment
NODE_ENV=production
```

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd BankingPlatform
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 4. Set up environment variables
```bash
# In backend directory
cp .env.example .env
# Edit .env with your configuration
```

## Development

### Start Backend Server
```bash
cd backend
npm run dev
```
Server will run on http://localhost:3000

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:3001

## Production Deployment

### Backend Deployment

1. **Set environment variables**:
   ```bash
   NODE_ENV=production
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   PORT=3000
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Start the server**:
   ```bash
   cd backend
   npm start
   ```

### Frontend Deployment

1. **Build the application**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve the built files**:
   ```bash
   npm run preview
   ```

### Deployment Platforms

#### Vercel (Frontend)
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables if needed

#### Railway/Render (Backend)
1. Connect your repository
2. Set root directory to `backend`
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

#### MongoDB Atlas
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add it to your backend environment variables

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Bank Accounts
- `GET /api/user/bank-accounts` - Get user's bank accounts
- `POST /api/user/bank-accounts` - Add new bank account
- `PUT /api/user/bank-accounts/:id` - Update bank account
- `DELETE /api/user/bank-accounts/:id` - Delete bank account

### Admin
- `GET /api/admin/all-bank-accounts` - Get all bank accounts (admin only)
- `GET /api/admin/search` - Search bank accounts (admin only)

## Project Structure

```
BankingPlatform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── services/
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration
- Input validation with Zod
- Secure environment variable handling

## Performance Optimizations

- Code splitting with Vite
- Manual chunks for better caching
- Optimized bundle size
- Lazy loading of components
- Efficient API calls

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your MONGO_URL in .env
   - Ensure MongoDB is running
   - Verify network connectivity

2. **CORS Errors**
   - Check FRONTEND_URL in production
   - Verify CORS configuration

3. **JWT Errors**
   - Ensure JWT_SECRET is set
   - Check token expiration

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## Support

For issues and questions, please check the troubleshooting section or create an issue in the repository.

## License

ISC License 