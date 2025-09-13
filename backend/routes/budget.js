const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

// Create Budget
router.post("/", async (req, res) => {
  try {
    const { total, year } = req.body;
    const budget = new Budget({ total, year });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ error: "Failed to create budget" });
  }
});

// Get all Budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

// Get Budget by ID
router.get("/:id", async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budget" });
  }
});

// Update Budget
router.put("/:id", async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: "Failed to update budget" });
  }
});

// Delete Budget
router.delete("/:id", async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete budget" });
  }
});

module.exports = router;