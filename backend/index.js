const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const user = require("./models/User");
const db = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const userRouters = require('./routes/UserRoutes');
const bankRoutes = require("./routes/bankRoutes");
const adminRoutes = require('./routes/adminRoutes');

const cors = require("cors");

app.use(cors({
    origin: "*" ,
    credentials : true,
}));
app.use(express.json());


app.get("/health", (req,res)=>{
    res.send("server is healthy")
})

app.use('/api/auth',authRoutes);
app.use('/api/users',userRouters);
app.use("/api/user", bankRoutes);


app.use('/api/admin', adminRoutes);


app.listen( PORT , ()=>{
    console.info(`Server is runnning at port ${PORT}` )
})