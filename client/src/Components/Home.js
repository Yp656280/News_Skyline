import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import moment from "moment";
import Divider from "@mui/material/Divider";
import noImg from "../assets/No_Image_Available.jpg";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

import { GetNews } from "../Controller/newsController";
import {
  GetCurrentWeather,
  GetFutureWeather,
  GetCurrentLocation,
} from "../Controller/weatherController";

const Home = () => {
  const [news, setNews] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [futureWeather, setFutureWeather] = useState([]);
  const [location, setLocation] = useState("");
  const [isDayOrNight, setIsDayOrNight] = useState("");
  const currentDate = moment().format("ddd, MMM DD");

  const handleDivClick = (url) => {
    window.open(url, "_blank"); // This will open the URL in a new tab
  };

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const newsData = await GetNews("indore");
        setNews(newsData.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    async function fetchFutureWeatherData() {
      try {
        const currentWeatherData = await GetFutureWeather("indore");
        console.log("test", currentWeatherData);
        setFutureWeather(currentWeatherData);
        console.log("Future Weather", futureWeather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }

    async function fetchLocation() {
      try {
        const currentLocation = await GetCurrentLocation();
        setLocation(currentLocation);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }

    async function fetchWeatherData() {
      try {
        const currentWeatherData = await GetCurrentWeather("indore");
        console.log(currentWeatherData);
        setCurrentWeather(currentWeatherData);
        console.log("Weather", currentWeather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }

    fetchFutureWeatherData();
    fetchNewsData();
    fetchWeatherData();
    fetchLocation();
  }, []);

  return (
    <>
      <div className="bg-slate-200">
        <div className="flex justify-evenly flex-wrap mx-4 mb-4">
          {" "}
          <Box className="basis-3/5">
            <Paper className="m-4 p-4" elevation={12}>
              <div className="flex flex-row justify-between">
                <div>
                  {currentWeather.is_day == 1
                    ? "Today's Weather"
                    : "Tonight's Weather"}
                </div>
                <div>{currentDate}</div>
              </div>
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <div>
                {/* Display weather data */}
                {currentWeather && (
                  <div>
                    {console.log(
                      "currentWeather",
                      futureWeather?.forecast?.forecastday[0].hour[23]
                        .feelslike_c
                    )}
                    <div>{currentWeather.description}</div>
                    <div className="flex">
                      <img src={currentWeather.conditionIcon} />
                      <div>
                        {currentWeather.conditionText}{" "}
                        {currentWeather.tempCelsius}C
                      </div>
                    </div>
                    <div className="flex  align-items-center">
                      <img
                        src={
                          futureWeather?.forecast?.forecastday[0].hour[23]
                            .condition.icon
                        }
                      />
                      <div class>
                        {
                          futureWeather?.forecast?.forecastday[0].hour[23]
                            .condition.text
                        }{" "}
                        {
                          futureWeather?.forecast?.forecastday[0].hour[23]
                            .feelslike_c
                        }
                        C
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Paper>
            <Paper className="m-4 p-4 h-60" elevation={12}>
              <div className="flex flex-row justify-between">
                <div>Current Weather</div>
                <div>{/* Time */}</div>
              </div>
              <div className=" border-t-2 border-gray-200"></div>
              <div className="flex flex-row ">
                <div className="basis-1/2">efjn wefjn ijwed weid</div>
                <div className="divide-y divide-blue-200 flex flex-col basis-1/2 p-4">
                  <div className="flex justify-around">
                    <div>Wind</div>
                    <div>80</div>
                  </div>
                  <div className="flex pt-4 justify-around">
                    <div>Wind gusts</div>
                    <div>80</div>
                  </div>
                  <div className="flex pt-4 justify-around">
                    <div>Air Quality</div>
                    <div>80</div>
                  </div>
                </div>
              </div>
            </Paper>
            <Paper
              elevation={12}
              className="m-4 p-4 overflow-x-scroll "
              style={{ width: "60vw" }}
            >
              <div>Hourly Weather</div>
              <div className="flex">
                {futureWeather &&
                  futureWeather?.forecast?.forecastday[0].hour.map(
                    (hours, index) => (
                      <div className="whitespace-nowrap p-4" key={index}>
                        <h2>
                          {moment(hours.time, "YYYY-MM-DD HH:mm").format("HH")}
                        </h2>
                        <img
                          src={hours.condition.icon}
                          className="aspect-square"
                          style={{
                            height: "3rem",
                            width: "10rem",
                            objectFit: "cover", // Add this to ensure both height and width increase
                          }}
                        />

                        <h1>{hours.temp_c}</h1>
                        <div className="flex">
                          <WaterDropOutlinedIcon />
                          <div>{hours.chance_of_rain}%</div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </Paper>

            <Paper className="m-4 p-4" elevation={12}>
              <div className="flex flex-row justify-between">
                <div>7-days weather forcast</div>
              </div>
              <div className="flex flex-col justify-center">
                {" "}
                {/* Apply flexbox to center align the forecast cards */}
                {futureWeather &&
                  futureWeather?.forecast?.forecastday.map((day, index) => (
                    <div
                      key={index}
                      className="flex-1 border-t-2 border-gray-200 flex pt-2 items-center"
                    >
                      {console.log("days", day)}
                      <div className="left flex basis-2/5 justify-around">
                        <div>
                          <div>
                            {index === 0
                              ? "TODAY"
                              : moment(day.date).format("ddd").toUpperCase()}
                          </div>
                          <div>{moment(day.date).format("DD/MM")}</div>
                        </div>
                        <div className="flex">
                          <img
                            src={day.day.condition.icon}
                            alt="Weather Icon"
                          />
                          <div className="m-auto">{day.day.maxtemp_c}</div>
                        </div>
                      </div>
                      <div className="right flex basis-3/5 justify-between px-4">
                        <div>
                          <div>{day.day.condition.text}</div>
                          <div className="flex">
                            <img
                              className="h-10 w-10"
                              src={day.hour[23].condition.icon}
                              alt="Weather Icon"
                            />
                            {day.hour[23].condition.text}
                          </div>
                        </div>
                        <div>
                          <WaterDropOutlinedIcon />
                          {day.day.daily_will_it_rain}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Paper>
          </Box>
          <div className="basis-1/3">
            <Paper
              className="m-4 p-4  pt-0 overflow-scroll "
              style={{
                scrollbarWidth: "none",
                maxHeight: "135.8vh",
                msOverflowStyle: "none",
              }}
              elevation={12}
            >
              <h1
                className="sticky   pt-1 h-8 top-0 bg-white"
                style={{ zIndex: 1, padding: "0rem 0px" }}
              >
                Top Stories
              </h1>
              <Divider />
              {news.map((article, index) => (
                <>
                  <div
                    key={index}
                    className="flex py-4 justify-between cursor-pointer"
                    onClick={() => handleDivClick(article.url)}
                  >
                    <h3>{article.title}</h3>
                    {/* <p>{article.description}</p> */}
                    <img
                      className="h-20 w-20"
                      src={article.urlToImage ? article.urlToImage : noImg}
                    />
                    {/* <img className="h-20 w-20" src={noImg} /> */}
                  </div>
                  <Divider />
                </>
              ))}
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
