const mongoose = require("mongoose");

// Brings in our mongoose --> All our mongoose methods are asynchronous
const connectDb = async () => {
  try {
    // Connecting to the MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Shows this Up in our Terminal to say its connected
    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // Show the error if it doesn't connect
    console.log(error);
    // If there is an error we want to close the process
    process.exit(1);
  }
};

module.exports = connectDb;
