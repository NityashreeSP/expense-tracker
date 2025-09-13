const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  allocated: { type: Number, required: true },
  budgetId: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" },
});

module.exports = mongoose.model("Department", departmentSchema);