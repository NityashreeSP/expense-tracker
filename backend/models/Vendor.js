const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  paid: { type: Number, default: 0 },
});

module.exports = mongoose.model("Vendor", vendorSchema);