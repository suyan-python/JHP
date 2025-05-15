import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Database and Routes
import connectDBMOGO from "./config/db.js";
import { productRoutes } from "./routes/productRoutes.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Payment Controllers
import {
  EsewaInitiatePayment,
  paymentStatus,
} from "./controller/esewa.controller.js";

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDBMOGO();

// App initialization
const app = express();
const PORT = process.env.PORT || 5000;

// Correct path handling for ESM (import.meta.url)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, ".."); // go to project root

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.get("/api/health", (req, res) => res.send("Backend Server Running ✅"));
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.post("/initiate-payment", EsewaInitiatePayment);
app.post("/payment-status", paymentStatus);

// Serve static files from client/dist
app.use(express.static(path.join(rootDir, "client", "dist")));

// Wildcard route for SPA frontend

// app.get("*", (req, res) => {
//   res.sendFile(path.join(rootDir, "client/dist", "index.html"));
// });

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
