// Get Request
const getGoals = (req, res) => {
  res.status(200).json({ msg: "Get Goals" });
};

// Post Request
const setGoal = (req, res) => {
  console.log(req.body);
  // If there is no text
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({ msg: "Post Goals" });
};

// Put Request -->
const updateGoal = (req, res) => {
  res.status(200).json({ msg: "Update Goals" });
};

// Delete Request
const deleteGoal = (req, res) => {
  res.status(200).json({ msg: "Delete Goals" });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
