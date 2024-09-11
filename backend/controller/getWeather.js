const fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");

//function to destructure the data

const destructure = function (data) {
  const {
    location: {
      name: locationName,
      region,
      country,
      lat,
      lon,
      tz_id: timeZone,
      localtime_epoch,
      localtime,
    },
    current: {
      last_updated_epoch,
      last_updated,
      temp_c: tempCelsius,
      temp_f: tempFahrenheit,
      is_day,
      condition: {
        text: conditionText,
        icon: conditionIcon,
        code: conditionCode,
      },
      wind_mph,
      wind_kph,
      wind_degree,
      wind_dir: wind_direction,
      pressure_mb,
      pressure_in,
      precip_mm,
      precip_in,
      humidity,
      cloud,
      feelslike_c: feelslike_celsius,
      feelslike_f: feelslike_farehnite,
      vis_km: visibilityKilometers,
      vis_miles: visibilityMiles,
      uv,
      gust_mph,
      gust_kph,
    },
  } = data;

  // Create an object
  const weatherObject = {
    locationName,
    region,
    country,
    lat,
    lon,
    timeZone,
    localtime_epoch,
    localtime,
    last_updated_epoch,
    last_updated,
    tempCelsius,
    tempFahrenheit,
    is_day,
    conditionText,
    conditionIcon,
    conditionCode,
    wind_mph,
    wind_kph,
    wind_degree,
    wind_direction,
    pressure_mb,
    pressure_in,
    precip_mm,
    precip_in,
    humidity,
    cloud,
    feelslike_celsius,
    feelslike_farehnite,
    visibilityKilometers,
    visibilityMiles,
    uv,
    gust_mph,
    gust_kph,
  };

  return weatherObject;
};

//fetching the current weather data
const getCurrentWeatherFromCity = asyncHandler(async function (req, res) {
  const weatherApi = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=994f16fde2644d26a0874326240903&q=${req.params.id}`
  );
  if (!weatherApi.ok) {
    res.status(404);
    throw new Error("Failed to fetch weather data");
  }
  const data = await weatherApi.json();

  res.status(201);
  res.json(destructure(data));
});

//fetching the current data from lat and lng
const getCurrentWeatherFromLatLng = async (req, res) => {
  const weatherApi = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=994f16fde2644d26a0874326240903&q=${req.params.lat},${req.params.lng}`
  );
  if (!weatherApi.ok) {
    res.status(404);
    throw new Error("Failed to fetch weather data");
  }
  const data = await weatherApi.json();
  res.status(201);
  res.json(destructure(data));
};

//fetching the future weather data
const getFutureWeatherFromCity = asyncHandler(async (req, res) => {
  const weatherApi = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=994f16fde2644d26a0874326240903&q=${req.params.id}&days=7&aqi=no&alerts=no
    `
  );
  if (!weatherApi.ok) {
    res.status(404);
    throw new Error("Failed to fetch weather data");
  }
  const data = await weatherApi.json();
  res.status(201);
  res.json(data);
});

//fetching the city of current user
const getLocation = async (req, res) => {
  try {
    const locationApi = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${req.params.lat}&lon=${req.params.lon}&apiKey=6fc162fd1ff645d5adb40e3da7d4f66c`
    );

    const data = await locationApi.text();
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCurrentWeatherFromCity,
  getLocation,
  getCurrentWeatherFromLatLng,
  getFutureWeatherFromCity,
};

//old api
//  // const weatherApi = await fetch(
//   `https://api.openweathermap.org/data/2.5/weather?q=${req.params.id}&appid=0b920e92853210d2fb3123955d146839`
// );
//// Destructuring the data object
// const {
//   coord: { lat, lon: lng },
//   weather: [{ description: weatherDescription, main }], // Destructuring weather array directly
//   base,
//   main: { temp: temp, humidity, feels_like, pressure, temp_max, temp_min }, // Rename to avoid conflict with 'main' keyword
//   visibility,
//   wind: { speed: windSpeed, deg: windDeg },
//   clouds: { all: clouds },
//   dt,
//   sys: { country, sunrise, sunset },
//   timezone,
//   id,
//   name,
//   cod,
// } = data;
// //Response object
// const responseObject = {
//   temp: (temp - 273.15).toFixed(1),
//   humidity,
//   feels_like: (feels_like - 273.15).toFixed(1),
//   pressure,
//   temp_max: (temp_max - 273.15).toFixed(1),
//   temp_min: (temp_min - 273.15).toFixed(1),
//   lat,
//   lng,
//   weatherDescription,
//   main,
//   base,
//   visibility,
//   windSpeed,
//   windDeg,
//   clouds,
//   dt,
//   country,
//   sunrise,
//   sunset,
//   timezone,
//   id,
//   name,
//   cod,
// };

// // Now you can use the destructured variables as needed
// console.log(data);
// console.log("temp: ", temp);
// console.log("humidity: ", humidity);
// console.log("feels_like: ", feels_like);
// console.log("pressure: ", pressure);
// console.log("temp_max: ", temp_max);
// console.log("temp_min: ", temp_min);

// console.log("lat lng", lat, lng);
// console.log("weatherDescription: ", weatherDescription);
// console.log("main: ", main);
// console.log("base: ", base);
// console.log("visibility: ", visibility);
// console.log("windSpeed: ", windSpeed);
// console.log("windDeg: ", windDeg);
// console.log("clouds: ", clouds);
// console.log("dt: ", dt);
// console.log("country", country);
// console.log("sunset", sunset);
// console.log("sunrise", sunrise);
// console.log("timezone: ", timezone);
// console.log("id: ", id);
// console.log("name: ", name);
// console.log("cod: ", cod);
