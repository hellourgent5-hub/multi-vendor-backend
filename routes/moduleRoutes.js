import express from "express";
import Module from "../models/Module.js";

const router = express.Router();

// GET all modules
router.get("/", async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a module
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newModule = new Module({ name });
    const saved = await newModule.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
