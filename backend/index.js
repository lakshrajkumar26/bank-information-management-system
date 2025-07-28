const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const user = require("./models/User");
const db = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const userRouters = require('./routes/UserRoutes');
const bankRoutes = require("./routes/bankRoutes");
const adminRoutes = require('./routes/adminRoutes');

const cors = require("cors");

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

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRouters);
app.use("/api/user", bankRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, ()=>{
    console.info(`Server is running at port ${PORT}`);
    console.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});