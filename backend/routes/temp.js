const express = require("express");
 
const router = express.Router(); 

router.get("/user" , (req,res) => {
    res.json({message : "Welcome User"});
})
router.get("/manager" , (req,res) => {
    res.json({message : "Welcome Manager"});
})
router.get("/admin" , (req,res) => {
    res.json({message : "Welcome Admin"});
})

module.exports = router;