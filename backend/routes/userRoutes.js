const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateUserIsAlive,
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.route("/setAlive").post(updateUserIsAlive);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/current", validateToken, currentUser);
module.exports = router;
