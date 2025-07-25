const express = require("express");
const app = express();
const PORT = 3000
const user = require("./models/User");
const db = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const userRouters = require('./routes/temp');
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("server is running")
})

app.use('/api/auth',authRoutes);
app.use('/api/users',userRouters);

app.listen( PORT , ()=>{
    console.info(`Server is runnning at port ${PORT}` )
})