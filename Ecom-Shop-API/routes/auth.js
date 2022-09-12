var express = require("express");
var router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
/* GET home page. */
router.post("/register", async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SK
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body.username);
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("User name is not correct!");
      return;
    }
    const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SK);

    if (hashedPass.toString(CryptoJS.enc.Utf8) !== req.body.password) {
      res.status(401).json("Wrong passwords!");
      return;
    }
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
