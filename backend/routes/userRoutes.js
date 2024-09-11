const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateUserIsAlive,
  sendOtp,
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");
const { checkToken } = require("../controller/checkToken");
const router = express.Router();
router.route("/checkToken").post(checkToken);
router.route("/sendOtp").post(sendOtp);
router.route("/setAlive").post(updateUserIsAlive);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.get("/current", validateToken, currentUser);
module.exports = router;
