// server.js (Simplified for debugging)
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";

// ... other imports ...

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MAIN ROUTES - ONLY KEEP THESE TWO
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vendors", vendorRoutes); 
// DELETE/COMMENT OUT ALL OTHER app.use('/api/...') LINES

// ... ROOT TEST ROUTE ...
// ... DATABASE CONNECTION & SERVER LISTEN ...
