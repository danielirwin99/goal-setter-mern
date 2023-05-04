const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("../backend/middleware/errorHandler");

app.use("/api/goals", require("./routes/goalRoutes"));

// Middleware so we can see our Posts
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.text());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
