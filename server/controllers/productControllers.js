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
        return url;
      })
    );

    console.log("Product Data:", productData);
    console.log("Image URLs:", imageUrls);

    await productModel.create({
      ...productData,
      images: imageUrls,
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
    res.status(200).json(products);
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
    const { productId, inStock } = req.body;
    await productModel.findByIdAndUpdate(productId, { inStock });
    res.status(200).json({ message: "Product stock updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
