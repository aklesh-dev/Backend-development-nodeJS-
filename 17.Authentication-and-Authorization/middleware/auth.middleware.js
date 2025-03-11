const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // console.log("Token:" authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }

  // Decode this token
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token: ", decodedTokenInfo);

    req.userInfo = decodedTokenInfo;

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }

};

module.exports = authMiddleware;