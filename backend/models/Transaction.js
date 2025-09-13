const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
  hash: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);