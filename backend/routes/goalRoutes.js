const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");

// Same as writing out .get and .post on seperate lines
router.route("/").get(getGoals).post(setGoal);

// Same as writing out .put and .post on seperate lines
router.route("/:id").delete(deleteGoal).put(updateGoal);

// router.get("/", getGoals);
// router.post("/", setGoal);
// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

module.exports = router;
