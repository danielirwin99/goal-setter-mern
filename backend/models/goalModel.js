const mongoose = require("mongoose");

// Allows us to different types of structures that get fetched to our MongoDB
// Every goal is going to be associated with a specific user
const goalSchema = mongoose.Schema(
  {
    user: {
      // We want this type to be an Object id
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Which model does this object id come from
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
