import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import proyectRoutes from "./routes/projectRoutes";

dotenv.config();

connectDB();

const app = express();

// Json
app.use(express.json());

// Routes
app.use("/api/projects", proyectRoutes);

export default app;