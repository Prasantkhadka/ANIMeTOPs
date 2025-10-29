// place order using COD
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

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

    let subTotal = 0;

    for (const item of items) {
      const product = await productModel.findById(item.product);
      if (!product) continue;
      const unitPrice = product.offerPrice ?? product.price ?? 0;
      subTotal += unitPrice * (item.quantity || 0);
    }

    // Round to 2 decimals as the frontend displays with toFixed(2)
    subTotal = Number(subTotal.toFixed(2));
    const taxAmount = Number((subTotal * taxPercentage).toFixed(2));
    const deliveryAmount = subTotal === 0 ? 0 : deliveryCharge;
    const totalAmount = Number(
      (subTotal + taxAmount + deliveryAmount).toFixed(2)
    );

    // Create new order (use schema fields: paymentMethod, isPaid (defaults), status)
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount: totalAmount,
      paymentMethod: "cod",
    });
    await newOrder.save();
    // Clear user's cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
      breakdown: {
        subTotal,
        tax: taxAmount,
        delivery: deliveryAmount,
        total: totalAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Place oerder using Stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Initialize totals
    let productData = [];
    let subTotal = 0;

    // Calculate subtotal and collect product details
    for (const item of items) {
      const product = await productModel.findById(item.product);

      if (!product) continue; // Skip invalid product IDs

      const unitPrice = product.offerPrice ?? product.price ?? 0;
      const quantity = item.quantity || 1;

      subTotal += unitPrice * quantity;

      productData.push({
        name: product.name,
        price: unitPrice,
        quantity,
      });
    }

    subTotal = Number(subTotal.toFixed(2));

    // Tax and delivery calculations
    const taxAmount = Number((subTotal * taxPercentage).toFixed(2));
    const deliveryAmount = subTotal > 0 ? deliveryCharge : 0;
    const totalAmount = Number(
      (subTotal + taxAmount + deliveryAmount).toFixed(2)
    );

    // Create and save order record before Stripe payment
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount: totalAmount,
      paymentMethod: "stripe",
      isPaid: false,
    });
    await newOrder.save();

    // Ensure Stripe secret key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      return res
        .status(500)
        .json({ message: "Stripe secret key not configured" });
    }

    // Initialize Stripe
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Resolve frontend origin for success/cancel URLs.
    // Prefer explicit CLIENT_URL (set in Vercel env). If not set, fall back to the
    // incoming request origin so preview deployments work as expected.
    const origin =
      process.env.CLIENT_URL || req.headers.origin || "http://localhost:5173";

    // Prepare Stripe line items
    const lineItems = [
      ...productData.map((p) => ({
        price_data: {
          currency,
          product_data: { name: p.name },
          unit_amount: Math.round(p.price * 100), // cents
        },
        quantity: p.quantity,
      })),
      {
        price_data: {
          currency,
          product_data: { name: "Tax (2%)" },
          unit_amount: Math.round(taxAmount * 100),
        },
        quantity: 1,
      },
      {
        price_data: {
          currency,
          product_data: { name: "Delivery Charge" },
          unit_amount: Math.round(deliveryAmount * 100),
        },
        quantity: 1,
      },
    ];

    // Create Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: { orderId: newOrder._id.toString(), userId },
    });

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Respond with Stripe session URL
    return res.status(201).json({
      message: "Order placed successfully",
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe order error:", error.message);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// Webhook to handle Stripe payment confirmation
export const stripeWebhook = async (req, res) => {
  try {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const signature = req.headers["stripe-signature"];
    let event;

    try {
      event = stripeInstance.webhooks.constructEvent(
        req.body, // raw body provided by bodyParser.raw
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Stripe webhook event received:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Session metadata:", session.metadata);

        const { orderId, userId } = session.metadata;
        await orderModel.findByIdAndUpdate(orderId, { isPaid: true });
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        console.log("Order marked as paid:", orderId);
        break;
      }

      case "payment_intent.payment_failed": {
        const session = event.data.object;
        const { orderId } = session.metadata;
        await orderModel.findByIdAndDelete(orderId);
        console.log("Order deleted due to payment failure:", orderId);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel
      .find({ userId })
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
