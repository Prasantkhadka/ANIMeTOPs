import express from "express";
import {
  addProduct,
  listProducts,
  getProduct,
  changeStock,
} from "../controllers/productControllers.js";
import { upload } from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  upload.array("images"),
  authAdmin,
  addProduct
);
productRouter.get("/list-products", listProducts);
productRouter.post("/product/:id", getProduct);
productRouter.post("/stock", changeStock);

export default productRouter;
