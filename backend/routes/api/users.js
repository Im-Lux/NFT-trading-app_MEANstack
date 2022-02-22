require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Get all Users from DB
router.get("/", async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.json({ status: 400, message: "No users found" });
  }
  res.json(users);
});

// Register as new User
router.post("/register", async (req, res) => {
  // Validation if input data is sent
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.image
  ) {
    return res.json({
      status: 400,
      message: "Username, password, email and image are all required",
    });
  }

  // Check if user already exists
  const checkEmail = await User.findOne({ email: req.body.email });
  const checkUsername = await User.findOne({ username: req.body.username });
  if (checkEmail || checkUsername) {
    return res.json({
      status: 400,
      message: "User already exists! Change email or username",
    });
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create and save new User
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    image: req.body.image,
    description: "",
    money: "0",
    isAdmin: false,
  });
  try {
    const saveNewUser = await newUser.save();
    res.status(201).json(saveNewUser);
  } catch (error) {
    res.json({ status: 400, message: "Error when creating new user" });
  }
});

// Login as current User
router.post("/login", async (req, res) => {
  // Validation if input data is sent
  if (!req.body.username || !req.body.password) {
    return res.json({
      status: 400,
      message: "Username and password are required",
    });
  }

  // Check if User exists in DB
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.json({
      status: 400,
      message: `User with ${req.body.username} doesn't exist, please register`,
    });
  }

  // Check if password is correct
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword) {
    return res.json({ status: 400, message: "Invalid password" });
  }

  // login user with jwt token
  const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET);
  res.status(200).json({
    message: `User ${user.username} is successfully logged in`,
    user: user,
    token: token,
  });
});

// Edit current User
router.put("/", async (req, res) => {
  if (!req.body._id) {
    return res.json({
      status: 400,
      message: "ID is required for updating User",
    });
  }

  const user = await User.findOne({ _id: req.body._id });
  if (!user) {
    return res.json({
      status: 400,
      message: `No User matches given ID ${req.body._id}`,
    });
  }
  if (req.body.username) user.username = req.body.username;
  if (req.body.email) user.email = req.body.email;
  if (req.body.description) user.description = req.body.description;
  if (req.body.money) user.money = req.body.money;
  user.isAdmin = req.body.isAdmin;
  const saveUser = await user.save();
  const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET);
  res.status(200).json({
    message: `User ${user.username} profile is successfully edited`,
    user: saveUser,
    token: token,
  });
});

router.delete("/:_id", async (req, res) => {
  if (!req.params._id) {
    return res.json({
      status: 400,
      message: `User ID is required for deleting User`,
    });
  }

  const user = await User.findOne({ _id: req.params._id });
  if (!user) {
    return res.json({
      status: 400,
      message: `No User matches given ID ${req.params._id}`,
    });
  }

  const deleteUser = await user.deleteOne({ _id: req.params._id });
  res.json(deleteUser);
});

module.exports = router;
