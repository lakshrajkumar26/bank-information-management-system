const BankAccount = require("../models/BankAccount");


const getAllBankAccount = async (req, res) => {
  try {
    const accounts = await BankAccount.find({ user: req.user.id });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch accounts', error: err.message });
  }
};


const addBankAccount = async (req, res) => {
  try {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;

    const newAccount = new BankAccount({
      user: req.user.id,
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    res.status(500).json({ message: "Failed to save account", error: err.message });
  }
};


const updateAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await BankAccount.findById(accountId);

    
    if (!account || account.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied or account not found" });
    }

    const updated = await BankAccount.findByIdAndUpdate(accountId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(501).json({ message: "Failed to update account", error: err.message });
  }
};


const deleteBankAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    console.log('Delete request received for account ID:', accountId);
    console.log('User ID from token:', req.user.id);
    
    const account = await BankAccount.findById(accountId);
    console.log('Found account:', account);

    if (!account || account.user.toString() !== req.user.id) {
      console.log('Access denied or account not found');
      return res.status(403).json({ message: "Access denied or account not found" });
    }

    await BankAccount.findByIdAndDelete(accountId);
    console.log('Account deleted successfully');
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error('Error in deleteBankAccount:', err);
    res.status(500).json({ message: "Failed to delete account", error: err.message });
  }
};

module.exports = {
  getAllBankAccount,
  addBankAccount,
  updateAccount,
  deleteBankAccount,
};
