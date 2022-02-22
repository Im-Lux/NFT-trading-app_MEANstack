require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(400).json({ message: "Access denied" });
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
