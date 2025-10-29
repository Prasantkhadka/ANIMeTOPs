import jwt from "jsonwebtoken";

// Middleware to authenticate user using JWT
const authUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not Authorized login again" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.userId = decoded.id; // Attach user ID to request object
    } else {
      return res.status(401).json({ message: "Not Authorized login again" });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default authUser;
