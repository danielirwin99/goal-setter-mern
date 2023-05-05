const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // If there is no name, email and password --> Return the error
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add fields");
  }

  // Check if user exists
  // Find the user by the email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password / encrypt it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Checking that the user information created is correct
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Authenticate User / Login
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // We need to get the email and password from the credentials of req.body we received from the user
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });

  // If there is a user and if the encrypted password === the user.password
  if (user && (await bcrypt.compare(password, user.password))) {
    // We respond with the same info back that they registered with above
    res.json({
      // All the information we get back
      _id: user.id,
      name: user.name,
      email: user.email,
      // This is created from JWT --> Check below
      token: generateToken(user._id),
    });
  } else {
    // Throw this back if its wrong
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getUser = asyncHandler(async (req, res) => {
  // Finds the credentials after you're logged in
  const { _id, name, email } = await User.findById(req.user.id);
  // When we hit send it responds with these three unique user credentials
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate JWT --> Json Web Token
const generateToken = (id) => {
  // Pass in the data we want to put in there
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // 30 Days
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUser };
