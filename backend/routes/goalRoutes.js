const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");
// Protects the routes --> You have to be logged in to send the goals
const { protect } = require("../middleware/authMiddleware");

// Same as writing out .get and .post on seperate lines
router.route("/").get(protect, getGoals).post(protect, setGoal);

// Same as writing out .put and .post on seperate lines
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

// router.get("/", getGoals);
// router.post("/", setGoal);
// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

module.exports = router;
