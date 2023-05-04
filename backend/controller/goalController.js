// Installed an async handler --> Replaces a try catch method
const asyncHandler = require("express-async-handler");

// Bringing in our models
const Goal = require("../models/goalModel");

// Get Request
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json({ goals });
});

// Post Request
const setGoal = asyncHandler(async (req, res) => {
  // If there is no text
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  // If there is Post Request
  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json({ goal });
});

// Put Request -->
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
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
  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
