import React, { useState, useEffect } from "react";
import { Box, Paper, Pagination, Skeleton, Divider } from "@mui/material";
import moment from "moment";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import noImg from "../assets/No_Image_Available.jpg";

import { GetNews } from "../Controller/newsController";
import {
  GetCurrentWeather,
  GetFutureWeather,
  GetCurrentLocation,
} from "../Controller/weatherController";

const Home = () => {
  const [news, setNews] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [futureWeather, setFutureWeather] = useState({});
  const [location, setLocation] = useState("");
  const [isDayOrNight, setIsDayOrNight] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleDivClick = (url) => {
    window.open(url, "_blank");
  };

  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const newsData = await GetNews("indore");
        
        setNews(newsData.articles);

        const currentWeatherData = await GetCurrentWeather("indore");
        setCurrentWeather(currentWeatherData);

        const futureWeatherData = await GetFutureWeather("indore");
        setFutureWeather(futureWeatherData);

        const currentLocation = await GetCurrentLocation();
        setLocation(currentLocation);

        setCurrentDate(moment().format("ddd, MMM DD"));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-evenly flex-wrap mx-4 mb-4">
        <Box className="basis-3/5">
          <Paper className="m-4 p-4" elevation={12}>
            <div className="flex flex-row justify-between">
              <div>
                {loading ? (
                  <Skeleton variant="text" width={100} />
                ) : currentWeather.is_day === 1 ? (
                  "Today's Weather"
                ) : (
                  "Tonight's Weather"
                )}
              </div>
              <div>
                {loading ? (
                  <Skeleton variant="text" width={100} />
                ) : (
                  currentDate
                )}
              </div>
            </div>
            <Divider />
            <div>
              {loading ? (
                <>
                <Skeleton variant="text" width="30%" height={50} />
                <Skeleton variant="text" width="30%" height={50} />
                </>
              ) : (
                <div>
                  <div>{currentWeather.description}</div>
                  <div className="flex">
                    <img
                      src={currentWeather?.conditionIcon}
                      alt="Weather Icon"
                    />
                    <div>
                      {currentWeather?.conditionText}{" "}
                      {currentWeather?.tempCelsius}C
                    </div>
                  </div>
                  <div className="flex align-items-center">
                    <img
                      src={
                        futureWeather?.forecast?.forecastday[0].hour[23]
                          .condition.icon
                      }
                      alt="Weather Icon"
                    />
                    <div>
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
          {loading ? (
            <Paper className="m-4 p-4" elevation={12}>
              <div className="flex flex-row justify-between">
                <div>Current Weather</div>
                <div>{/* Time */}</div>
              </div>
              <div className="border-t-2 border-gray-200"></div>
              <div className="flex flex-row items-center">
                <div className="basis-1/2 flex justify-left">
                  <Skeleton variant="rectangular" width={140} height={140} className="mr-4 mt-2" />
                  <div className="flex flex-col justify-center">
                    <Skeleton variant="text" width={100} height={100} />
                    <Skeleton variant="text" width={100} />
                  </div>
                </div>
                <div className="divide-y divide-blue-200 flex flex-col basis-1/2 p-4">
                  <Skeleton variant="text" width={400} />
                  <Skeleton variant="text" width={400} />
                  <Skeleton variant="text" width={400} />
                </div>
              </div>
            </Paper>
          ) : (
            <Paper className="m-4 p-4" elevation={12}>
              <div className="flex flex-row justify-between">
                <div>Current Weather</div>
                <div>{/* Time */}</div>
              </div>
              <div className=" border-t-2 border-gray-200"></div>
              <div className="flex flex-row items-center">
                <div className="basis-1/2 flex justify-left">
                  <img
                    className="ml-2"
                    src={currentWeather.conditionIcon}
                    width={180}
                    height={180}
                  />
                  <div className="flex flex-col justify-center">
                    <h1 className="text-6xl font-bold">
                      {currentWeather.tempCelsius}C
                    </h1>
                    <h4>RealFeels {currentWeather.feelslike_celsius}C </h4>
                  </div>
                </div>
                <div className="divide-y divide-blue-200 flex flex-col basis-1/2 p-4">
                  <div className="flex justify-between">
                    <div>Wind</div>
                    <div>
                      {currentWeather.wind_direction} {currentWeather.wind_mph}{" "}
                      mph
                    </div>
                  </div>
                  <div className="flex pt-4 justify-between">
                    <div>Wind gusts</div>
                    <div>{currentWeather.gust_mph} mph</div>
                  </div>
                  <div className="flex pt-4 justify-between">
                    <div>Visibility</div>
                    <div>{currentWeather.visibilityKilometers} KM</div>
                  </div>
                </div>
              </div>
            </Paper>
          )}
          {loading ? (
            <Paper
              elevation={12}
              className="m-4 p-4 overflow-x-scroll"
              style={{ width: "60vw" }}
            >
              <div>Hourly Weather</div>
              <div className="flex">
                {[...Array(24)].map((_, index) => (
                  <div className="whitespace-nowrap p-4" key={index}>
                    <Skeleton variant="text" width={50} />
                    <Skeleton variant="rectangular" width={100} height={100} />
                    <Skeleton variant="text" width={50} />
                    <Skeleton variant="text" width={50} />
                  </div>
                ))}
              </div>
            </Paper>
          ) : (
            <Paper
              elevation={12}
              className="m-4 p-4 overflow-x-scroll"
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
          )}
{loading?(<Paper className="m-4 p-4" elevation={12}>
  <div className="flex flex-row justify-between">
    <div>7-days weather forecast</div>
  </div>
  <div className="flex flex-col justify-center">
    {[...Array(7)].map((_, index) => (
      <div key={index} className="flex-1 border-t-2 border-gray-200 flex pt-2 items-center">
        <div className="left flex basis-2/5 justify-around">
          <div>
            <Skeleton variant="text" width={50} />
            <Skeleton variant="text" width={50} />
          </div>
          <div className="flex">
            <Skeleton variant="rectangular" width={50} height={50} />
            <Skeleton variant="text" width={50} />
          </div>
        </div>
        <div className="right flex basis-3/5 justify-between px-4">
          <div>
            <Skeleton variant="text" width={100} />
            <div className="flex">
              <Skeleton variant="rectangular" width={50} height={50} />
              <Skeleton variant="text" width={50} />
            </div>
          </div>
          <div>
            <Skeleton variant="text" width={50} />
            <Skeleton variant="text" width={50} />
          </div>
        </div>
      </div>
    ))}
  </div>
</Paper>):(  <Paper className="m-4 p-4" elevation={12}>
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
                        <img src={day.day.condition.icon} alt="Weather Icon" />
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
          </Paper>)}
        
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
              >Top Stories</h1>
  <Divider />
  {!loading ? (
    news.map((article, index) => (
      <div
        key={index}
        className="flex py-4 justify-between cursor-pointer"
        onClick={() => handleDivClick(article.url)}
      >
        <h3>{article.title}</h3>
        <img
          className="h-20 w-20"
          src={article.urlToImage ? article.urlToImage : noImg}
          alt="Article"
        />
      </div>
    ))
  ) : (
    Array.from({ length: 10 }, (_, index) => (
  <div key={index} className="flex py-4 justify-between cursor-pointer">

      <Skeleton variant="text" width="100%" className="mr-4" />


    <Skeleton variant="rectangular" width={80} height={60} />
  </div>
))

    
  )}
</Paper>

        </div>
      </div>
    </div>
  );
};

export default Home;
