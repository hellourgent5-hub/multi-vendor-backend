import express from "express";
import {
  getVendors,
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor
} from "../controllers/vendorController.js";

const router = express.Router();

router.get("/", getVendors);
router.get("/:id", getVendor);
router.post("/", createVendor);
router.put("/:id", updateVendor);
router.delete("/:id", deleteVendor);

export default router;
