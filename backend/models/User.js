const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique : true,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required : true,
    enum : ["admin","manager", "user"]
  }
}, { timestamps: true });

const user =  mongoose.model("User", userSchema);
module.exports = user;
