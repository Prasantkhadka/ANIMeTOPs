// place order using COD
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const currency = "AUD";
const taxPercentage = 0.02;
const deliveryCharge = 10;

export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    if (items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount
    let subTotal = 0;

    for (const item of items) {
      const product = await productModel.findById(item.productId);
      subTotal += product.price * item.quantity;
    }

    const taxAmount = subTotal * taxPercentage;
    const totalAmount = subTotal + taxAmount + deliveryCharge;

    // Create new order
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount: totalAmount,
      paymentMethod: "cod",
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });
    // Clear user's cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Place oerder using Stripe
export const placeOrderStripe = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel
      .find({ userId, $or: [{ paymentMethod: "cod" }, { isPaid: true }] })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ $or: [{ paymentMethod: "cod" }, { isPaid: true }] })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findByIdAndUpdate(orderId, { status });

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
