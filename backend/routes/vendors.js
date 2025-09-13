const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

// Create Vendor
router.post("/", async (req, res) => {
  try {
    const { name, projectId, paid } = req.body;
    const vendor = new Vendor({ name, projectId, paid });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ error: "Failed to create vendor" });
  }
});

// Get all Vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
});

// Get Vendor by ID
router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vendor" });
  }
});

// Update Vendor
router.put("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: "Failed to update vendor" });
  }
});

// Delete Vendor
router.delete("/:id", async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete vendor" });
  }
});

module.exports = router;