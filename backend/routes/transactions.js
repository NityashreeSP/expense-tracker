const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const { generateHash } = require("../utils/hash");

// Create a new transaction
router.post("/", async (req, res) => {
  const { from, to, amount } = req.body;
  try {
    const timestamp = Date.now();
    const hash = generateHash({ from, to, amount, timestamp });

    const transaction = new Transaction({ from, to, amount, timestamp, hash });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

// Get all transactions (with optional search/filter)
router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let filter = {};

    if (searchQuery) {
      filter = {
        $or: [
          { from: { $regex: searchQuery, $options: "i" } },
          { to: { $regex: searchQuery, $options: "i" } }
        ]
      };
    }

    const transactions = await Transaction.find(filter).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Get a single transaction by ID
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
});

// Update a transaction by ID
router.put("/:id", async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    const timestamp = Date.now();
    const hash = generateHash({ from, to, amount, timestamp });

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { from, to, amount, timestamp, hash },
      { new: true }
    );

    res.json(updatedTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

// Delete a transaction by ID
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

module.exports = router;