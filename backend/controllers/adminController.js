const BankAccount = require("../models/BankAccount");
const User = require("../models/User");



//GET all users' bank accounts (admin only)
const getAllBankAccounts = async (req, res) => {
    try {
        const AllUsers = await BankAccount.find().populate("user", "email username role")     //give target id  , then thing you need
        res.status(200).json(AllUsers);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch all bank accounts", error: err.message });
    }
}

//Search & filter by username, bank name, IFSC

const searchBankAccounts = async (req, res) => {
    try {
        const { username, bankName, ifscCode } = req.query;
        const query = {};
        if (bankName) {
            query.bankName = { $regex: bankName, $options: "i" }; //case -insensitive
        }
        if (ifscCode) {
            query.ifscCode = { $regex: ifscCode, $options: "i" };
        }
        if (username) {
            const user = await User.findOne({ username });
            if (user) {
                query.user = user._id;
            } else {
                return res.status(404).json({ message: "No user found with given username" });
            }
        }
        const filteredAccounts = await BankAccount.find(query).populate("user", "username email role");
        res.status(200).json(filteredAccounts);

    }
    catch (err) {
        res.status(500).json({ message: "Error filtering accounts", error: err.message })
    }
}

module.exports = {getAllBankAccounts , searchBankAccounts}