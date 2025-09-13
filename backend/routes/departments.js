const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// Create Department
router.post("/", async (req, res) => {
  try {
    const { name, allocated, budgetId } = req.body;
    const department = new Department({ name, allocated, budgetId });
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ error: "Failed to create department" });
  }
});

// Get all Departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

// Get Department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch department" });
  }
});

// Update Department
router.put("/:id", async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: "Failed to update department" });
  }
});

// Delete Department
router.delete("/:id", async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete department" });
  }
});

module.exports = router;