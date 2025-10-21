import jwt from "jsonwebtoken";

// Middleware to authenticate user using JWT
const authAdmin = async (req, res, next) => {
  const adminToken =
    req.cookies.adminToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!adminToken) {
    return res.status(401).json({ message: "Not Authorized login again" });
  }
  try {
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (decoded.email === process.env.ADMIN_EMAIL) {
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ message: "Not Authorized login again" });
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default authAdmin;
