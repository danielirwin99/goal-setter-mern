// Installed an async handler --> Replaces a try catch method
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

// Bringing in our models
const Goal = require("../models/goalModel");

// Get Request
const getGoals = asyncHandler(async (req, res) => {
  // Finds only the specific Users goals
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// Post Request --> Creates the Goal
const setGoal = asyncHandler(async (req, res) => {
  // If there is no text
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  // If there is Post Request
  const goal = await Goal.create({
    text: req.body.text,
    // Includes the User in the Schema of the goals section
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// Put Request --> Update Goal
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user --> If not one then throw the Error
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  // Finds the updated goal by --> the query of id that we POSTED (req.params.id) || the body text || creates a new type
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// Delete Request
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  // Check for user --> If not one then throw the Error back
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  // const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
