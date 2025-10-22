import express from "express";
import {
  userSignup,
  userLogin,
  userLogout,
  isAuth,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/signin", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/is-auth", authUser, isAuth);

export default userRouter;
