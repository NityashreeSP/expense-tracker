const Vendor = require("../models/Vendor");

// Create a new vendor
exports.createVendor = async (req, res) => {
  try {
    const { name, paid, projectId } = req.body;
    const vendor = new Vendor({ name, paid, projectId });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create vendor" });
  }
};

// Get all vendors
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch vendor" });
  }
};

// Update vendor
exports.updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update vendor" });
  }
};

// Delete vendor
exports.deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete vendor" });
  }
};