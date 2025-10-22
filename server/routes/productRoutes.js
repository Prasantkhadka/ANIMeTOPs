import express from "express";
import {
  addProduct,
  listProducts,
  getProduct,
  changeStock,
} from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("images"), authAdmin, addProduct);
productRouter.get("/list", listProducts);
productRouter.post("/product/:id", getProduct);
productRouter.put("/stock", changeStock);

export default productRouter;
