const express = require("express");
const router = express.Router();
const Module = require("../models/Module");

// Create a new module
router.post("/", async (req, res) => {
  try {
    const newModule = new Module({
      name: req.body.name,
      description: req.body.description,
    });
    const savedModule = await newModule.save();
    res.status(201).json(savedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all modules
router.get("/", async (req, res) => {
  try {
    const modules = await Module.find();
    res.status(200).json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get module by ID
router.get("/:id", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.status(200).json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update module
router.put("/:id", async (req, res) => {
  try {
    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedModule) return res.status(404).json({ message: "Module not found" });
    res.status(200).json(updatedModule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete module
router.delete("/:id", async (req, res) => {
  try {
    const deletedModule = await Module.findByIdAndDelete(req.params.id);
    if (!deletedModule) return res.status(404).json({ message: "Module not found" });
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
