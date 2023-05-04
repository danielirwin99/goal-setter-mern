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
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    // Throw this back if its wrong
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Public
const getUser = asyncHandler(async (req, res) => {
  await res.json({ msg: "User data display" });
});

module.exports = { registerUser, loginUser, getUser };
