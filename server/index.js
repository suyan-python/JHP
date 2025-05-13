import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// import { connectDB } from "./src/DB/db.js";
import connectDBMOGO from "./src/config/db.js";
import { productRoutes } from "./src/routes/productRoutes.js";
import { cartRoutes } from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

import {
  EsewaInitiatePayment,
  paymentStatus,
} from "./src/controller/esewa.controller.js";

dotenv.config();
// connectDB();
connectDBMOGO();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("Backend Server Running"));
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.post("/initiate-payment", EsewaInitiatePayment);
app.post("/payment-status", paymentStatus);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
