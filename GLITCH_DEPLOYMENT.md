# Glitch Deployment Guide

## 🚀 Deploy to Glitch

### Step 1: Create New Glitch Project
1. Go to [Glitch.com](https://glitch.com)
2. Click "New Project" → "Import from GitHub"
3. Enter your GitHub repository URL
4. Click "Import"

### Step 2: Set Environment Variables
In your Glitch project, go to `.env` file and add:

```env
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secure_jwt_secret_key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Step 3: Get MongoDB Atlas Connection String
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create cluster (free tier)
4. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### Step 4: Update Environment Variables
Replace the values in your `.env` file:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/banking_platform
JWT_SECRET=your_very_secure_secret_key_here
NODE_ENV=production
```

### Step 5: Your App is Live!
Glitch will automatically:
- Install dependencies
- Start your server
- Provide you with a live URL

## 🔧 Glitch Features

### Auto-restart
Glitch automatically restarts your app when you make changes to:
- `index.js`
- `backend/*.js` files
- `package.json`

### Environment Variables
- Use `.env` file for environment variables
- Variables are automatically loaded

### Logs
- View logs in the Glitch console
- Real-time error reporting

## 📊 Health Check
Test your deployment by visiting:
`https://your-app-name.glitch.me/health`

You should see: `"server is healthy"`

## 🎯 API Endpoints
Your backend will be available at:
- `https://your-app-name.glitch.me/api/auth/login`
- `https://your-app-name.glitch.me/api/auth/register`
- `https://your-app-name.glitch.me/api/user/bank-accounts`
- `https://your-app-name.glitch.me/api/admin/all-bank-accounts`

## ✅ Ready for Deployment!
Your banking platform is now ready to deploy on Glitch! 