const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controller/userController");

// When we make a post request to "/" --> "/api/users"
// -- We are adding a user / registering one
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getUser);

module.exports = router;
