require("dotenv").config();

const config = require("./config");
const mongoose = require("mongoose");

// connecting to mongodb database
mongoose.connect(config.connectionString);

const User = require("./models/user.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// test
app.get("/test", (req, res) => {
  res.send("Test endpoint working");
});

// Create Account
// The route handler is defined as an asynchronous function that takes two parameters: req (the request object) and res (the response object).
app.post("/create-account", async (req, res) => {
  // This line uses destructuring to extract fullName, email, and password from the request body. These are expected to be sent in the request payload.
  const { fullName, email, password } = req.body;

  // These lines check if fullName and password are provided in the request body.
  // If fullName is missing, it responds with a 400 status code and an error message.
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Fullname is required" });
  }
  // If password is missing, it similarly responds with a 400 status code and an error message.
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({
      error: true,
      message: "User already exists",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      messsage: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid Credentials" });
  }
});

app.listen(8000);

module.exports = app;
