import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

dotenv.config(); /// Load environment variables from .env file

const app = express(); /// Create an Express application
const PORT = process.env.PORT || 1111; /// Define the port

await connectDB(); /// Connect to the database

// CORS configuration allow multiple origins
const allowedOrigins = ["http://localhost:5173/"];

/// Middleware setup
app.use(express.json()); /// Middleware to parse JSON requests
app.use(cookieParser()); /// Middleware to parse HTTP request cookies
app.use(
  cors({
    origin: allowedOrigins, // Replace with your allowed origins
    credentials: true, // Allow cookies/authorization headers to be sent
  })
);

/// API Routes
app.use("/api/user", userRouter); /// User routes
app.use("/api/admin", adminRouter); /// Admin routes

/// Basic route to test server
app.get("/", (req, res) => {
  res.send("API is running...");
});

/// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
