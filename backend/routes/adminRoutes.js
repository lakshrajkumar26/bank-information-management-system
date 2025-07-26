const express = require('express');
const router = express.Router();
const {verifyToken} = require("../middlewares/authMiddleware");
const {authorizeRoles} = require("./../middlewares/roleMiddleware")

const { getAllBankAccounts , searchBankAccounts } = require("../controllers/adminController");

router.use(verifyToken, authorizeRoles("admin"));

router.get('/all-bank-accounts', getAllBankAccounts);
router.get('/search', searchBankAccounts);

module.exports = router;