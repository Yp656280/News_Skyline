const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const checkToken = asyncHandler(async (req, res) => {
  let { token } = req.body;
  // console.log(token);
  // token = token.slice(1, -1);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
  } else {
    res.send(false);
  }
});

module.exports = { checkToken };
