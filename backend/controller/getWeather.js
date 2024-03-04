const fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");

const getWeatherFromCity = asyncHandler(async function (req, res) {
  console.log(req.params.id);
  const weatherApi = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${req.params.id}&appid=0b920e92853210d2fb3123955d146839`
  );
  if (!weatherApi.ok) {
    res.status(404);
    throw new Error("Failed to fetch weather data");
  }
  const data = await weatherApi.json();

  // Destructuring the data object
  const {
    coord: { lat, lon: lng },
    weather: [{ description: weatherDescription, main }], // Destructuring weather array directly
    base,
    main: { temp: temp, humidity, feels_like, pressure, temp_max, temp_min }, // Rename to avoid conflict with 'main' keyword
    visibility,
    wind: { speed: windSpeed, deg: windDeg },
    clouds: { all: clouds },
    dt,
    sys: { country, sunrise, sunset },
    timezone,
    id,
    name,
    cod,
  } = data;
  //Response object
  const responseObject = {
    temp: (temp - 273.15).toFixed(1),
    humidity,
    feels_like: (feels_like - 273.15).toFixed(1),
    pressure,
    temp_max: (temp_max - 273.15).toFixed(1),
    temp_min: (temp_min - 273.15).toFixed(1),
    lat,
    lng,
    weatherDescription,
    main,
    base,
    visibility,
    windSpeed,
    windDeg,
    clouds,
    dt,
    country,
    sunrise,
    sunset,
    timezone,
    id,
    name,
    cod,
  };

  res.status(201);
  res.json(responseObject);
});

const getLocation = async (req, res) => {
  try {
    const locationApi = await fetch("https://ipapi.co/city/");

    const data = await locationApi.text();
    res.status(201).json({ city: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getWeatherUsingLatLng = async (req, res) => {
  console.log();
};
module.exports = {
  getWeatherFromCity,
  getLocation,
};

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
