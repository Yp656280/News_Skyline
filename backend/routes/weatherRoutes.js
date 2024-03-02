const express = require("express");
const { getWeather } = require("../controller/getWeather");
const router = express.Router();

router.route("/:id").get(getWeather);
module.exports = router;
