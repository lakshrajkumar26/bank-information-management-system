const express = require("express");
const {verifyToken} = require("../middlewares/authMiddleware");
const {authorizeRoles} = require("./../middlewares/roleMiddleware");
const router = express.Router(); 

router.get("/user" , verifyToken , authorizeRoles("admin" , "manager" , "user") , (req,res) => {    // this admin , manager ,user all can access 
    res.status(200).json({message : "Welcome User"});
})
router.get("/manager" ,verifyToken , authorizeRoles("admin" , "manager") , (req,res) => {
    res.status(200).json({message : "Welcome Manager"});
})
router.get("/admin" ,verifyToken, authorizeRoles("admin") , (req,res) => {
    res.status(200).json({message : "Welcome Admin"});
})

module.exports = router;