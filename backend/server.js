const express = require("express");
const colors = require("colors");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("../backend/middleware/errorHandler");
const connectDB = require("./config/db");
const path = require("path");

// Connects the server to MongoDB
connectDB();

// Middleware so we can see our Posts
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Server Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
