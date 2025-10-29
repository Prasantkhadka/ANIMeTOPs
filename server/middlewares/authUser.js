import jwt from "jsonwebtoken";

// Middleware to authenticate user using JWT
const authUser = async (req, res, next) => {
  // DEBUG: log incoming origin and cookies to help diagnose missing cookie issues in production
  try {
    console.log("authUser DEBUG - origin:", req.headers.origin);
    console.log("authUser DEBUG - cookie header:", req.headers.cookie);
    console.log("authUser DEBUG - parsed cookies:", req.cookies);
  } catch (e) {
    console.log("authUser DEBUG - logging error", e && e.message);
  }
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
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
