import express from "express";
import authUser from "../middlewares/authUser.js";
import { addToCart, updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.put("/update", authUser, updateCart);

export default cartRouter;
