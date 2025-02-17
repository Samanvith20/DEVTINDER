const express = require("express");
const { authMiddleware, userauth } = require("./middlewares/authmiddleware");
const connectdb = require("./config/database");
const User = require("./models/user.model");

// Create an instance of Express
const app = express();

// dotenv configuration
require("dotenv").config();



// Define a port
const port = 3000;

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const userDetails = {
      name: "Samanvith",
      email: "Samanvith123@gmail.com",
      age: 23,
    };``

    const newUser = new User(userDetails);
    await newUser.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Connect to database and then start the server
connectdb()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to database", err);
  });
