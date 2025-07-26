const bankAccount = require("../models/BankAccount");
const BankAccount = require("../models/BankAccount");
const { findById } = require("../models/User");

const getAllBankAcoount = async (req, res) => {
    try {
        const account = await BankAccount.find({ user: req.user.id });
        res.status(200).json(account);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch accounts', error: err.message });
    }
};


const addBankAccount = async (req, res) => {
    try {
        const { user, ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
        const newAccount = new BankAccount({ user : req.user.id, ifscCode, branchName, bankName, accountNumber, accountHolderName })
        const savedAccount = await newAccount.save();
        res.status(201).json({ savedAccount });
    }
    catch (err) {
        res.status(500).json({ message: `Failed to save account with error : ${err}` });
    }

}

const updateAccount = async (req, res) => {
    try {
        const accountId = req.params.id;  // send id params    and recivedd in account Id
        const account = await BankAccount.findById(accountId);
        if (!account || account.user.toString !== req, user.id) {
            return res.status(403).json({ message: "Access denied or User not found" });
        }

        const updated = await BankAccount.findByIdAndUpdate(accountI, req.body, { new: true });
        res.status(200).json(updated);
    }
    catch (err) {
        res.status(201).json({ message: "Failed to update account", error: err.message });
    }
}
const deleteBankAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const account = bankAccount.findById(accountId);

        if (!account || account.user.toString() !== req.user.id) {
            res.status(403).json({ message: "Failed to Find account" });
        }
        await BankAccount.findByIdAndUpdate(accountId);
        res.status(200).json({ message: "Account deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete account", error: err.message });
    }
}
module.exports = {getAllBankAcoount , addBankAccount , updateAccount , deleteBankAccount };