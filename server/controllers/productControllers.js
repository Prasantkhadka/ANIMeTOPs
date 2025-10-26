import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// Add product
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    let imageUrls = await Promise.all(
      images.map(async (file) => {
        const url = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return url.secure_url;
      })
    );

    await productModel.create({
      ...productData,
      image: imageUrls,
    });

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all products/List products
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    const formatted = products.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      offerPrice: product.offerPrice,
      sizes: product.sizes,
      category: product.category,
      image: product.image,
      inStock: product.inStock,
      description: product.description,
    }));
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// get single product
export const getProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// update product stock status
export const changeStock = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { productId, inStock } = req.body;
    console.log("Updating stock:", productId, inStock);
    await productModel.findByIdAndUpdate(productId, { inStock });
    res.status(200).json({ message: "Product stock updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
