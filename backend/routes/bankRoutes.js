const express = require("express");
const router = express.Router();
const { getAllBankAcoount, addBankAccount, updateAccount, deleteBankAccount } = require("../controllers/bankController")
const {verifyToken} = require("../middlewares/authMiddleware");

router.use(verifyToken); //protects all routes

router.get("/bank-accounts",getAllBankAcoount);
router.post('/bank-accounts',addBankAccount);
router.put("/bank-accounts/:id",updateAccount);
router.delete("/bank-accounts/:id",deleteBankAccount);

module.exports = router;