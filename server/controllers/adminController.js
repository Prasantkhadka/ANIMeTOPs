import jwt from "jsonwebtoken";

// admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Check admin authentication
export const isAdminAuth = async (req, res) => {
  try {
    return res.status(200).json({ message: "Admin is authenticated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin logout
export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
