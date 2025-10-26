import userModel from "../models/userModel.js";

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    cartData[productId] = cartData[productId] || {}; // Initialize product if not exists
    cartData[productId][size] = (cartData[productId][size] || 0) + 1; // Increment size quantity

    await userModel.findByIdAndUpdate(userId, { cartData });

    res
      .status(200)
      .json({ message: "Item added to cart successfully", cartData });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Updating cart
export const updateCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    // ensure product and size exist in cart before updating
    if (!cartData[productId]) {
      cartData[productId] = {};
    }

    if (quantity > 0) {
      cartData[productId][size] = quantity; // Update size quantity
    } else {
      delete cartData[productId][size]; // Remove size if quantity is 0
      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId]; // Remove product if no sizes left
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ message: "Cart updated successfully", cartData });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
