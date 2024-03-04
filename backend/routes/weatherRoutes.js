const express = require("express");
const { getWeatherFromCity,getLocation } = require("../controller/getWeather");
const router = express.Router();

router.route("/:id").get(getWeatherFromCity);
router.route("/getLocation").post(getLocation);

module.exports = router;
