const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ifscCode: {
    type: String,
    required: true,
    uppercase: true
  },
  branchName: {
    type: String,
    required: true,
    trim: true
  },
  bankName: {
    type: String,
    required: true,
    trim: true
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true
  },
  accountHolderName: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const bankAccount = mongoose.model("BankAccount", bankAccountSchema);
module.exports  = bankAccount;
