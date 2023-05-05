const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Format --> Bearer "token"
  if (
    req.headers.authorization &&
    // Making sure its a Bearer token
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header // Assigning to this variable
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      // .select("-password") --> Won't include the password
      req.user = await User.findById(decoded.id).select("-password");

      // Calling next piece of middleware
      next();
    } catch (error) {
      // If something goes wrong
      console.log(error);
      res.status(401);
      throw new Error("Not Authorised");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorised, No Token");
  }
});

module.exports = { protect };
