const express = require('express');
const router = express.Router();
const {verifyToken} = require("../middlewares/authMiddleware");

const { getAllBankAccounts , searchBankAccounts } = require("../controllers/adminController");

// Allow all authenticated users to access admin routes
// Authorization will be handled in the controller
router.use(verifyToken);

router.get('/all-bank-accounts', getAllBankAccounts);
router.get('/search', searchBankAccounts);

module.exports = router;