const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
   
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports =authenticateToken;