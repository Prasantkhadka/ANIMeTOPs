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
      paymentStatus: "pending",
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

    // Resolve frontend origin for success/cancel URLs
    const origin = process.env.CLIENT_URL || "http://localhost:5173";

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
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      res.status(400).json({ message: "Webhook Error", error: error.message });
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;
        // Retrieve the session to access metadata
        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
        });
        // Retrieve orderId and userId from metadata
        const { orderId, userId } = session.data[0].metadata;

        // Update order status to paid
        await orderModel.findByIdAndUpdate(orderId, { isPaid: true });
        //clear user cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;
        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
        });
        const { orderId } = session.data[0].metadata;
        await orderModel.findByIdAndDelete(orderId);
        break;
      }
      default:
        console.error(`Unhandled event type ${event.type}`);
        break;
    }

    res.status(200).json({ received: true });
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
