var express = require("express");
var router = express.Router();
const { handleError } = require("../utils");
var { users } = require("../db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

router.post("/register", (req, res) => {
  console.log(`POST request to "/auth/register" received for user`);

  try {
    users.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        return handleError(res, err);
      }
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      // Other validation and user insertion code here

      return res.status(201).json({
        success: true,
      });
    });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/login", (req, res) => {
  console.log(`POST request to "/auth/login" received`);

  try {
    users.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        return handleError(res, err);
      }
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Username does not exist",
        });
      }
      if (user.password !== sha256(req.body.password)) {
        return res.status(400).json({
          success: false,
          message: "Password is incorrect",
        });
      }
      const token = jwt.sign({ username: user.username }, config.jwtSecret, {
        expiresIn: "6h",
      });

      console.log(`Logged in as user: ${req.body.username}`);

      return res.status(201).json({
        success: true,
        token: token,
        username: user.username,
        balance: user.balance,
      });
    });
  } catch (error) {
    handleError(res, error);
  }
});

const sha256 = (input) =>
  crypto.createHash("sha256").update(input, "utf8").digest("hex");

module.exports = router;
