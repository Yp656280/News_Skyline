const express = require("express");
const {
  getCurrentWeatherFromCity,
  getLocation,
  getCurrentWeatherFromLatLng,
  getFutureWeatherFromCity,
} = require("../controller/getWeather");
const router = express.Router();

router.route("/future/:id").get(getFutureWeatherFromCity);
router.route("/current/:lat/:lng").get(getCurrentWeatherFromLatLng);
router.route("/current/:id").get(getCurrentWeatherFromCity);
router.route("/getLocation/:lat/:lon").post(getLocation);

module.exports = router;
