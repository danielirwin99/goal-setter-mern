// Installed an async handler --> Replaces a try catch method
const asyncHandler = require("express-async-handler");

// Get Request
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "Get Goals" });
});

// Post Request
const setGoal = asyncHandler(async (req, res) => {
  console.log(req.body);
  // If there is no text
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({ msg: "Post Goals" });
});

// Put Request -->
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "Update Goals" });
});

// Delete Request
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "Delete Goals" });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
