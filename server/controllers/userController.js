import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const cookieOptions = {
  httpOnly: true, // Prevent client-side JS from accessing the cookie
  secure: process.env.NODE_ENV === "production", // Use secure cookies in production, ensure the cookie is only sent over HTTPS
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // controls whether cookies are sent with cross-site requests
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// User Signup and Auto-Login Controller
export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Validate email and password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // 5. Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. Set token cookie for persistent login
    res.cookie("token", token, cookieOptions);

    // 7. Return success response with user info and token
    return res.status(201).json({
      success: true,
      message: "Signup successful! You are now logged in.",
      token, // <--- send token for frontend localStorage/sessionStorage if needed
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      message: "User signed in successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//Check User Authentication
export const isAuth = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId).select("-password");
    const cartData = user?.cartData || {};
    return res.status(200).json({ user, cartData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Logout
export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
