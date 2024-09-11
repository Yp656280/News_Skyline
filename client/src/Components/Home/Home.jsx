import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, Pagination, Skeleton, Divider } from "@mui/material";
import moment from "moment";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import noImg from "../../assets/No_Image_Available.jpg";
import sunny_icon from "../../assets/images/hourly/sunny_icon.png";
import partly_cloudy_icon from "../../assets/images/hourly/partly_cloudy_icon.png";
import cloudy_icon from "../../assets/images/hourly/cloudy_icon.png";
import overcast_icon from "../../assets/images/hourly/overcast_icon.png";
import mist_icon from "../../assets/images/hourly/mist_icon.png";
import rain_icon from "../../assets/images/hourly/rain_icon.png";
import snow_icon from "../../assets/images/hourly/snow_icon.png";
import sleet_icon from "../../assets/images/hourly/sleet_icon.png";
import drizzle_icon from "../../assets/images/hourly/drizzle_icon.png";
import thunderstorm_icon from "../../assets/images/hourly/thunderstorm_icon.png";
import blowing_snow_icon from "../../assets/images/hourly/blowing_snow_icon.png";
import blizzard_icon from "../../assets/images/hourly/blizzard_icon.png";
import fog_icon from "../../assets/images/hourly/fog_icon.png";
import ice_pellets_icon from "../../assets/images/hourly/ice_pellets_icon.png";
import night_icon from "../../assets/images/hourly/moon_icon.png";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
const Home = () => {
  const iconMapping = {
    1000: sunny_icon,
    1003: partly_cloudy_icon,
    1006: cloudy_icon,
    1009: overcast_icon,
    1030: mist_icon,
    1063: cloudy_icon, // Merged patchy rain possible
    1066: snow_icon, // Merged patchy snow possible
    1069: sleet_icon, // Merged patchy sleet possible
    1072: drizzle_icon, // Merged patchy freezing drizzle possible
    1087: thunderstorm_icon, // Thundery outbreaks possible
    1114: blowing_snow_icon,
    1117: blizzard_icon,
    1135: fog_icon, // Merged freezing fog
    1150: drizzle_icon, // Merged patchy light drizzle
    1153: drizzle_icon, // Light drizzle
    1168: drizzle_icon, // Freezing drizzle
    1171: drizzle_icon, // Heavy freezing drizzle
    1180: rain_icon, // Merged patchy light rain
    1183: rain_icon, // Light rain
    1186: rain_icon, // Moderate rain at times
    1189: rain_icon, // Moderate rain
    1192: rain_icon, // Heavy rain at times
    1195: rain_icon, // Heavy rain
    1198: sleet_icon, // Light freezing rain
    1201: sleet_icon, // Moderate or heavy freezing rain
    1210: snow_icon, // Merged patchy light snow
    1213: snow_icon, // Light snow
    1216: snow_icon, // Patchy moderate snow
    1219: snow_icon, // Moderate snow
    1222: snow_icon, // Patchy heavy snow
    1225: snow_icon, // Heavy snow
    1237: ice_pellets_icon,
    1240: rain_icon, // Merged light rain shower
    1243: rain_icon, // Moderate or heavy rain shower
    1246: rain_icon, // Torrential rain shower
    1249: sleet_icon, // Merged light sleet showers
    1252: sleet_icon, // Moderate or heavy sleet showers
    1255: snow_icon, // Merged light snow showers
    1258: snow_icon, // Moderate or heavy snow showers
    1261: ice_pellets_icon, // Merged light showers of ice pellets
    1264: ice_pellets_icon, // Moderate or heavy showers of ice pellets
    1273: thunderstorm_icon, // Merged patchy light rain with thunder
    1276: thunderstorm_icon, // Moderate or heavy rain with thunder
    1279: thunderstorm_icon, // Merged patchy light snow with thunder
    1282: thunderstorm_icon, // Moderate or heavy snow with thunder
  };
  const displayIcon = (conditionCode, hour) => {
    let icon;
    if (hour > 18) {
      if (conditionCode === 1000) {
        icon = night_icon;
      } else {
        icon = iconMapping[conditionCode];
      }
    } else if (hour >= 0 && hour <= 4) {
      if (conditionCode === 1000) {
        icon = night_icon;
      } else {
        icon = iconMapping[conditionCode];
      }
    } else {
      icon = iconMapping[conditionCode];
    }
    if (icon) {
      return icon;
    } else {
      console.log("No icon found for condition code:", conditionCode);
    }
  };
  const [news, setNews] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [futureWeather, setFutureWeather] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const now = new Date();
  const dispatch = useDispatch();
  const handleDivClick = (url) => {
    window.open(url, "_blank");
  };
  useEffect(() => {
    if (!lat && !long) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLat(latitude);
          setLong(longitude);
        },
        (error) => {
          console.log("error in getting location");
        }
      );
    } else if (lat && long && !city) {
      fetch(`http://localhost:4000/api/weather/getLocation/${lat}/${long}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          sessionStorage.setItem(
            "city",
            JSON.parse(data).features[0].properties.city
          );
          setCity(JSON.parse(data).features[0].properties.city);
        });
    } else if (city) {
      try {
        setLoading(true);
        Promise.all([
          fetch(`http://localhost:4000/api/news/${city}`).then((response) =>
            response.json()
          ),
          fetch(`http://localhost:4000/api/weather/current/${city}`).then(
            (response) => response.json()
          ),
          fetch(`http://localhost:4000/api/weather/future/${city}`).then(
            (response) => response.json()
          ),
        ]).then(
          ([newsResponse, currentWeatherResponse, futureWeatherResponse]) => {
            setNews(newsResponse.articles);
            setCurrentWeather(currentWeatherResponse);
            setFutureWeather(futureWeatherResponse);
            setLoading(false);
          }
        );

        setCurrentDate(moment().format("ddd, MMM DD"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [city, lat, long]);
  return (
    <>
      <div className="bg-slate-200">
        <div className="flex justify-evenly flex-wrap mx-4 mb-4">
          <Box className="basis-3/5">
            <Paper className="m-4 p-4 " elevation={12}>
              <div className="flex flex-row justify-between  ">
                <div className="font-semibold  text-2xl mb-4 ">
                  {loading ? (
                    <Skeleton variant="text" width={100} />
                  ) : currentWeather.is_day === 1 ? (
                    "Today's Weather"
                  ) : (
                    "Tonight's Weather"
                  )}
                </div>
                <div className="font-semibold">
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
                  <div className="">
                    <div className="font-semibold">
                      {currentWeather.description}
                    </div>
                    <div className="flex items-center font-semibold  mb-4 ">
                      <img
                        style={{ height: "45px", marginRight: "25px" }}
                        src={displayIcon(
                          futureWeather?.forecast?.forecastday[0].hour[12]
                            .condition.code,
                          12
                        )}
                        alt="Weather Icon"
                      />
                      <div className="font-semibold  flex">
                        <div className=" mr-4 font-semibold">
                          {" "}
                          {
                            futureWeather?.forecast?.forecastday[0].hour[12]
                              .condition.text
                          }
                        </div>
                        {"      "}
                        {
                          futureWeather?.forecast?.forecastday[0].hour[12]
                            .feelslike_c
                        }
                        °C
                      </div>
                    </div>
                    <div className="flex items-center align-items-center font-semibold">
                      <img
                        style={{ height: "45px", marginRight: "25px" }}
                        src={displayIcon(
                          futureWeather?.forecast?.forecastday[0].hour[23]
                            .condition.code,
                          23
                        )}
                        alt="Weather Icon"
                      />
                      <div className="flex font-semibold">
                        <div className=" mr-4 font-semibold">
                          {" "}
                          {
                            futureWeather?.forecast?.forecastday[0].hour[23]
                              .condition.text
                          }
                        </div>{" "}
                        {
                          futureWeather?.forecast?.forecastday[0].hour[23]
                            .feelslike_c
                        }
                        °C
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Paper>
            {loading ? (
              <Paper
                className="m-4 p-4 "
                // sx={{ borderRadius: "120px" }}
                elevation={12}
              >
                <div className="flex flex-row justify-between">
                  <div>Current Weather</div>
                  <div>{/* Time */}</div>
                </div>
                <div className="border-t-2 border-gray-200"></div>
                <div className="flex flex-row items-center">
                  <div className="basis-1/2 flex justify-left">
                    <Skeleton
                      variant="rectangular"
                      width={140}
                      height={140}
                      className="mr-4 mt-2"
                    />
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
              <Paper className="m-4 p-4 font-semibold" elevation={12}>
                <div className="flex flex-row justify-between  ">
                  <div className="font-semibold text-2xl"> Current Weather</div>
                  <div>{/* Time */}</div>
                </div>
                <div className=" border-t-2 border-gray-200"></div>
                <div className="flex flex-row items-center">
                  <div className="basis-1/2 flex justify-left">
                    <img
                      className="ml-2  mr-7"
                      style={{ height: "120px" }}
                      src={displayIcon(
                        currentWeather.conditionCode,
                        now.getHours()
                      )}
                    />
                    <div className="flex flex-col justify-center">
                      <h1 className="text-6xl font-bold">
                        {currentWeather.tempCelsius}°C
                      </h1>
                      <h4 className="font-semibold">
                        RealFeels {currentWeather.feelslike_celsius}C{" "}
                      </h4>
                    </div>
                  </div>
                  <div className="divide-y divide-blue-200 flex font-semibold flex-col basis-1/2 p-4">
                    <div className="flex justify-between">
                      <div className="font-semibold">Wind</div>
                      <div className="font-semibold">
                        {currentWeather.wind_direction}{" "}
                        {currentWeather.wind_mph} mph
                      </div>
                    </div>
                    <div className="flex pt-4 justify-between">
                      <div className="font-semibold">Wind gusts</div>
                      <div className="font-semibold">
                        {currentWeather.gust_mph} mph
                      </div>
                    </div>
                    <div className="flex pt-4 justify-between">
                      <div className="font-semibold">Visibility</div>
                      <div className="font-semibold">
                        {currentWeather.visibilityKilometers} KM
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            )}
            {loading ? (
              <Paper
                elevation={12}
                className="m-4 p-4 overflow-x-scroll "
                // sx={{ borderRadius: "12px" }}
                style={{ width: "60vw" }}
              >
                <div>Hourly Weather</div>
                <div className="flex">
                  {[...Array(24)].map((_, index) => (
                    <div className="whitespace-nowrap p-4" key={index}>
                      <Skeleton variant="text" width={50} />
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={100}
                      />
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
                style={{
                  width: "60vw",
                  scrollbarWidth: "none",

                  msOverflowStyle: "none",
                }}
              >
                <div className=" font-semibold  text-2xl">Hourly Weather</div>
                <Box
                  sx={{
                    width: "100%",
                    height: "79%",
                    display: "flex",
                    overflow: "scroll",
                    padding: "10px",
                    scrollbarWidth: "none",
                    // border: "solid black 1px",
                    msOverflowStyle: "none",
                  }}
                >
                  {futureWeather?.forecast?.forecastday[0].hour.map(
                    (hours, index) => (
                      <div
                        className="whitespace-nowrap p-4"
                        style={{
                          height: "92%",
                          minWidth: "100px",
                          // border: "solid black 1px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "500",
                          fontSize: "2.5vh",
                          boxShadow:
                            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                          backgroundColor: "white",
                          marginRight: "10px",
                          marginTop: "12px",
                          borderRadius: "15px",
                        }}
                        key={nanoid()}
                      >
                        <h2 style={{ fontSize: "2.5vh" }}>
                          {parseInt(hours.time.substring(11, 13)) > 12
                            ? `${
                                parseInt(hours.time.substring(11, 13)) - 12
                              } pm`
                            : `${hours.time.substring(11, 13) - 0} am`}
                        </h2>
                        <img
                          src={displayIcon(
                            hours.condition.code,
                            hours.time.substring(11, 13)
                          )}
                          className="aspect-square"
                          style={{
                            height: "40%",
                            width: "62%",
                            margin: "10px",
                            // objectFit: "cover", // Add this to ensure both height and width increase
                          }}
                        />
                        <h1>{hours?.temp_c}°C</h1>
                      </div>
                    )
                  )}
                </Box>
              </Paper>
            )}
            {loading ? (
              <Paper className="m-4 p-4" elevation={12}>
                <div className="flex flex-row justify-between">
                  <div>3-days weather forecast</div>
                </div>
                <div className="flex flex-col justify-center">
                  {[...Array(7)].map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 border-t-2 border-gray-200 flex pt-2 items-center"
                    >
                      <div className="left flex basis-2/5 justify-around">
                        <div>
                          <Skeleton variant="text" width={50} />
                          <Skeleton variant="text" width={50} />
                        </div>
                        <div className="flex">
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            height={50}
                          />
                          <Skeleton variant="text" width={50} />
                        </div>
                      </div>
                      <div className="right flex basis-3/5 justify-between px-4">
                        <div>
                          <Skeleton variant="text" width={100} />
                          <div className="flex">
                            <Skeleton
                              variant="rectangular"
                              width={50}
                              height={50}
                            />
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
              </Paper>
            ) : (
              <Paper className="m-4 p-4" elevation={12}>
                <div className="flex flex-row justify-between">
                  <div className=" font-semibold">3-days Weather forecast</div>
                </div>
                <div className="flex flex-col justify-center">
                  {" "}
                  {/* Apply flexbox to center align the forecast cards */}
                  {futureWeather &&
                    futureWeather?.forecast?.forecastday.map((day, index) => (
                      <div
                        key={index}
                        className="flex-1 border-t-2 border-gray-200 flex pt-2 items-center "
                      >
                        <div className="left flex basis-3/5 justify-around ">
                          <div>
                            <div className=" font-semibold">
                              {index === 0
                                ? "TODAY"
                                : moment(day.date).format("ddd").toUpperCase()}
                            </div>
                            <div className=" font-semibold ml-4">
                              {moment(day.date).format("DD/MM")}
                            </div>
                          </div>
                          <div
                            className="flex  "
                            // style={{ height: "1%" }}
                          >
                            <img
                              src={iconMapping[day.day.condition.code]}
                              style={{ height: "40px", marginRight: "20px" }}
                              alt="Weather Icon"
                            />
                            <div className="m-auto font-semibold">
                              {day.day.maxtemp_c}°C
                            </div>
                          </div>
                        </div>
                        <div className="right flex  basis-2/4 justify-between px-4  ">
                          <div className=" ">
                            <div className="flex font-semibold">
                              <img
                                style={{ height: "30px", marginRight: "20px" }}
                                src={displayIcon(
                                  day.hour[23].condition.code,
                                  23
                                )}
                                alt="Weather Icon"
                              />
                              {day.day.mintemp_c}°C
                            </div>
                          </div>
                          <div className=" font-semibold">
                            <WaterDropOutlinedIcon />
                            {day?.day?.daily_chance_of_rain}%
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Paper>
            )}
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
                className="sticky font-semibold   text-2xl pt-1     h-16 top-0 bg-white  "
                style={{ zIndex: 1, padding: "1rem 1rem" }}
              >
                Top Stories
              </h1>

              {!loading
                ? news.map((article, index) => (
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
                : Array.from({ length: 10 }, (_, index) => (
                    <div
                      key={index}
                      className="flex  py-6 justify-between cursor-pointer  "
                    >
                      <Skeleton variant="text" width="100%" className="mr-4" />

                      <Skeleton variant="rectangular" width={80} height={60} />
                    </div>
                  ))}
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
