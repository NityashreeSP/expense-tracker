const Department = require("../models/Department");

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name, allocated, budgetId } = req.body;
    const department = new Department({ name, allocated, budgetId });
    await department.save();
    res.status(201).json(department);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create department" });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch department" });
  }
};

// Update department
exports.updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDepartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update department" });
  }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete department" });
  }
};