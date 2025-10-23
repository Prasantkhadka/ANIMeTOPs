import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import {
  getAllOrders,
  placeOrderCOD,
  updateOrderStatus,
  placeOrderStripe,
  getUserOrders,
} from "../controllers/orderController.js";
import authUser from "../middlewares/authUser.js";

const orderRouter = express.Router();

// For admin
orderRouter.post("/list", authAdmin, getAllOrders);
orderRouter.post("/update-status", authAdmin, updateOrderStatus);

// For payment
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// For User
orderRouter.post("/user-orders", authUser, getUserOrders);

export default orderRouter;
