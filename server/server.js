import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import { stripeWebhook } from "./controllers/orderController.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 1111;

// Connect to database and Cloudinary
await connectDB();
await connectCloudinary();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://animetops.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// ------------------------
// Stripe Webhook Route
// Must use raw body BEFORE express.json()
// ------------------------
app.post(
  "/stripe",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhook
);

// ------------------------
// JSON Middleware for all other routes
// ------------------------
app.use(express.json());

// ------------------------
// API Routes
// ------------------------
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Basic test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
