const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const user = require("./backend/models/User");
const db = require('./backend/config/dbConnection');
const authRoutes = require('./backend/routes/authRoutes');
const userRouters = require('./backend/routes/UserRoutes');
const bankRoutes = require("./backend/routes/bankRoutes");
const adminRoutes = require('./backend/routes/adminRoutes');

const cors = require("cors");

// CORS configuration for Glitch
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL || "https://your-frontend-domain.com"
        : "*",
    credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get("/health", (req,res)=>{
    res.send("server is healthy")
});

// Root endpoint for Glitch
app.get("/", (req,res)=>{
    res.json({
        message: "Banking Platform API",
        status: "running",
        endpoints: {
            health: "/health",
            auth: "/api/auth",
            users: "/api/users",
            bankAccounts: "/api/user/bank-accounts",
            admin: "/api/admin"
        }
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRouters);
app.use("/api/user", bankRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, ()=>{
    console.info(`🚀 Server is running at port ${PORT}`);
    console.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.info(`📊 Health check: http://localhost:${PORT}/health`);
    console.info(`🔗 API base: http://localhost:${PORT}/api`);
}); 