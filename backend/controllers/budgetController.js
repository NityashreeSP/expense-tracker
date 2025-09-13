const Budget = require("../models/Budget");

// Create a new budget
exports.createBudget = async (req, res) => {
  try {
    const { total, year } = req.body;
    const budget = new Budget({ total, year });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create budget" });
  }
};

// Get all budgets
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
};

// Get budget by ID
exports.getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch budget" });
  }
};

// Update budget
exports.updateBudget = async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBudget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update budget" });
  }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete budget" });
  }
};