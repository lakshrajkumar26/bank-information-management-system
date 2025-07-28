# Netlify Deployment Guide

## 🚀 Deploy Frontend to Netlify

### Step 1: Prepare Frontend for Production

First, we need to update the frontend to use your deployed backend URL instead of localhost.

#### Update API URLs in Frontend

**In `frontend/src/features/auth/login.jsx`:**
```javascript
// Change from:
const response = await axios.post('http://localhost:3000/api/auth/login', formData);

// To your deployed backend URL (e.g., Glitch):
const response = await axios.post('https://your-backend-name.glitch.me/api/auth/login', formData);
```

**In `frontend/src/features/auth/register.jsx`:**
```javascript
// Change from:
const response = await axios.post('http://localhost:3000/api/auth/register', {

// To:
const response = await axios.post('https://your-backend-name.glitch.me/api/auth/register', {
```

**In `frontend/src/features/admin/AdminPanel.jsx`:**
```javascript
// Change from:
const response = await axios.get('http://localhost:3000/api/admin/all-bank-accounts', {

// To:
const response = await axios.get('https://your-backend-name.glitch.me/api/admin/all-bank-accounts', {
```

**In `frontend/src/services/api.jsx`:**
```javascript
// Change from:
baseURL: 'http://localhost:3000/api/user'

// To:
baseURL: 'https://your-backend-name.glitch.me/api/user'
```

### Step 2: Deploy Backend First

Deploy your backend to Glitch or Railway first:
1. **Glitch**: Follow `GLITCH_DEPLOYMENT.md`
2. **Railway**: Follow `DEPLOYMENT.md`
3. **Get your backend URL** (e.g., `https://your-app.glitch.me`)

### Step 3: Deploy Frontend to Netlify

#### Method A: Deploy from GitHub
1. Go to [Netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

#### Method B: Deploy from Local Build
1. Build your frontend locally:
   ```bash
   cd frontend
   npm run build
   ```
2. Go to Netlify dashboard
3. Drag and drop the `frontend/dist` folder
4. Your site will be live instantly

### Step 4: Environment Variables (Optional)

In Netlify dashboard, go to Site settings → Environment variables:
```env
REACT_APP_API_URL=https://your-backend-name.glitch.me
```

### Step 5: Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add your custom domain
3. Configure DNS settings

## 🔧 Netlify Features

### Auto-deploy
- Automatically deploys when you push to GitHub
- Preview deployments for pull requests
- Branch deployments

### Forms
- Netlify can handle form submissions
- Automatic spam protection
- Email notifications

### Functions
- Serverless functions for backend logic
- Can replace some backend functionality

## 📊 Testing Your Deployment

### Frontend (Netlify)
- Visit your Netlify URL
- Test login/register functionality
- Test bank account management

### Backend (Glitch/Railway)
- Health check: `https://your-backend.glitch.me/health`
- API endpoints: `https://your-backend.glitch.me/api/*`

## 🎯 Complete Setup

1. **Backend**: Deployed on Glitch/Railway
2. **Frontend**: Deployed on Netlify
3. **Database**: MongoDB Atlas
4. **Domain**: Custom domain (optional)

## ✅ Benefits of This Setup

- **Fast frontend**: Netlify's CDN
- **Reliable backend**: Glitch/Railway
- **Scalable**: Each service scales independently
- **Cost-effective**: All free tiers available

## 🚨 Important Notes

- **CORS**: Make sure your backend allows your Netlify domain
- **HTTPS**: All services use HTTPS by default
- **Environment variables**: Update API URLs in frontend
- **Testing**: Test all functionality after deployment

Your banking platform will be live with:
- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-backend.glitch.me` 