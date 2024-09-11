import React, { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Box from "@mui/material/Box";
import thermometer from "../../assets/images/thermometer.png";
import wind from "../../assets/images/wind.png";
import sun from "../../assets/images/sun.png";
import watrerDroplet from "../../assets/images/water droplet.png";
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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
function WeatherMain() {
  const { weatherSearch } = useParams();
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
  const currentHour = new Date().getHours();
  const x = [1, 2, 3, 4, 5, 6, 7];
  const [currentWeather, setCurrentWeather] = useState("");
  const [futureWeather, setFutureWeather] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [loading, setLoading] = useState(true);
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
      // Display icon
      return icon;
      // Here you can set the source of an image tag or do whatever you need to display the icon
    } else {
      // Handle unknown condition code
      console.log("No icon found for condition code:", conditionCode);
    }
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
          setCity(JSON.parse(data).features[0].properties.city);
        });
    } else if (city) {
      try {
        Promise.all([
          fetch(`http://localhost:4000/api/weather/current/${city}`).then(
            (response) => response.json()
          ),
          fetch(`http://localhost:4000/api/weather/future/${city}`).then(
            (response) => response.json()
          ),
        ]).then(([currentWeatherResponse, futureWeatherResponse]) => {
          setCurrentWeather(currentWeatherResponse);
          setFutureWeather(futureWeatherResponse);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [city, lat, long]);
  return (
    <>
      <Box
        sx={{
          // border: "solid black 1px",
          width: "65%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Box
          sx={{
            height: "8%",
            width: "98%",
            marginTop: "36px",
            // border: "solid black 1px",
          }}
        >
          <input
            type="text"
            placeholder="Search for cities"
            className=" m-0  text-left rounded-2xl shadow-none  outline-none"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(234, 236, 239)",
              fontSize: "17px",
              paddingLeft: "10px",
            }}
          />
        </Box> */}

        <Box
          sx={{
            height: "30%",
            width: "98%",
            marginTop: "10px",
            // border: "solid black 1px",
            marginTop: "25px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              // border: "solid black 1px",
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {loading ? (
              <Skeleton
                variant="text"
                animation="wave"
                height={120}
                width={200}
              />
            ) : (
              <Box
                sx={{
                  fontSize: "350%",
                  fontWeight: "bold",
                  color: "#202b3bff",
                  marginTop: "",
                  // border: "solid black 1px",
                }}
              >
                {currentWeather?.locationName}
              </Box>
            )}
            {loading ? (
              <Skeleton animation="wave" height={40} width={170} />
            ) : (
              <Box
                sx={{
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "#9399a2ff",
                  marginTop: "-30px",
                  // border: "solid black 1px",
                }}
              >
                Chance of rain :
                {` ${futureWeather?.forecast?.forecastday[0]?.day.daily_chance_of_rain}`}
                %
              </Box>
            )}
            {loading ? (
              <Skeleton animation="wave" height={120} width={200} />
            ) : (
              <Box
                sx={{
                  fontSize: "350%",
                  fontWeight: "bold",
                  color: "#202b3bff",
                  marginTop: "20px",
                  // border: "solid black 1px",
                }}
              >
                {futureWeather?.current?.temp_c}°
              </Box>
            )}
          </Box>
          {loading ? (
            <Skeleton animation="wave" width={220} />
          ) : (
            <Box
              sx={{
                // border: "solid black 1px",
                width: "30%",
              }}
            >
              <img
                src={displayIcon(currentWeather?.conditionCode, currentHour)}
                alt=""
              />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            height: "28%",
            width: "98%",
            marginTop: "20px",
            // border: "solid black 1px",
            backgroundColor: "rgb(234, 236, 239) ",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            paddingRight: "20px",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "13%",
              paddingLeft: "20px",
              paddingTop: "10px",
              fontSize: "3vh",
              fontWeight: "500",
            }}
          >
            Today's Forecast
          </Box>
          {loading ? (
            <Skeleton
              variant="text"
              animation="wave"
              width={800}
              height={180}
            />
          ) : (
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
                        ? `${parseInt(hours.time.substring(11, 13)) - 12} pm`
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
          )}
        </Box>

        <Box
          sx={{
            height: "31%",
            width: "98%",
            marginTop: "25px",
            // border: "solid red 1px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(234, 236, 239) ",
            borderRadius: "25px",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            // padding: "10px",
          }}
        >
          <Box
            sx={{
              width: "95%",
              // border: "solid green 1px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              alignItems: "space-between",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                width: "80%",
                display: "flex",

                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "space-between",
                fontWeight: "600",
                fontSize: "20px",
                padding: "10px",
                marginTop: "-10px",
              }}
            >
              Air Conditions
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "98%",
              height: "83.5%",
              // border: "solid red 1px",
              padding: "10px",
              paddingLeft: "20px",
              borderRadius: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                // border: "solid black 1px",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "top",
                  alignItems: "left",
                  width: "100%",
                  height: "100%",
                  // border: "solid red 1px",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                    // border: "solid red 1px",
                    display: "flex",
                    justifyContent: "",
                    alignItems: "center",
                    paddingLeft: "15px",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  <img
                    src={thermometer}
                    style={{ marginRight: "2%" }}
                    className="h-8 w-8"
                    alt=""
                  />
                  Real Feel
                </Box>
                {loading ? (
                  <Skeleton animation="wave" width={80} height={60} />
                ) : (
                  <Box
                    sx={{
                      fontSize: "40px",
                      // border: "solid red 1px",
                      paddingLeft: "15%",
                      fontWeight: "500",
                      paddingTop: "10px",
                    }}
                  >
                    {futureWeather?.current?.feelslike_c}°c
                  </Box>
                )}
              </Box>
              {/* chances of rain */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "top",
                  alignItems: "left",
                  width: "100%",
                  height: "100%",
                  // border: "solid red 1px",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                    // border: "solid red 1px",
                    display: "flex",
                    justifyContent: "",
                    alignItems: "center",
                    paddingLeft: "14px",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  <img
                    src={watrerDroplet}
                    style={{ marginRight: "2%" }}
                    className="h-8 w-8"
                    alt=""
                  />
                  Chances of Rain
                </Box>
                {loading ? (
                  <Skeleton animation="wave" width={80} height={50} />
                ) : (
                  <Box
                    sx={{
                      fontSize: "30px",
                      // border: "solid red 1px",
                      fontSize: "40px",
                      paddingLeft: "15%",
                      fontWeight: "500",
                      paddingTop: "10px",
                    }}
                  >
                    {
                      futureWeather?.forecast?.forecastday[0].hour[12]
                        .chance_of_rain
                    }
                    %
                  </Box>
                )}{" "}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                // border: "solid yellow 1px",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "top",
                  alignItems: "left",
                  width: "100%",
                  height: "100%",
                  // border: "solid red 1px",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                    // border: "solid red 1px",
                    display: "flex",
                    justifyContent: "",
                    alignItems: "center",
                    paddingLeft: "14px",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  <img
                    src={wind}
                    style={{ marginRight: "2%" }}
                    className="h-8 w-8"
                    alt=""
                  />
                  Wind Speed
                </Box>
                {loading ? (
                  <Skeleton animation="wave" width={80} height={50} />
                ) : (
                  <Box
                    sx={{
                      fontSize: "30px",
                      // border: "solid red 1px",
                      fontSize: "40px",
                      paddingLeft: "15%",
                      fontWeight: "500",
                      paddingTop: "10px",
                    }}
                  >
                    {futureWeather?.current?.wind_kph} kp/h
                  </Box>
                )}{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "top",
                  alignItems: "left",
                  width: "100%",
                  height: "100%",
                  // border: "solid red 1px",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                    // border: "solid red 1px",
                    display: "flex",
                    justifyContent: "",
                    alignItems: "center",
                    paddingLeft: "14px",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  <img
                    src={sun}
                    style={{ marginRight: "2%" }}
                    className="h-8 w-8"
                    alt=""
                  />
                  UV index
                </Box>
                {loading ? (
                  <Skeleton width={80} height={50} animation="wave" />
                ) : (
                  <Box
                    sx={{
                      fontSize: "30px",
                      // border: "solid red 1px",
                      fontSize: "40px",
                      paddingLeft: "15%",
                      fontWeight: "500",
                      paddingTop: "10px",
                    }}
                  >
                    {currentHour > 18 && currentHour < 6
                      ? "0"
                      : `${futureWeather?.current?.uv}`}
                  </Box>
                )}{" "}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          // border: "solid black 1px",
          width: "35%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // border: "solid orange 1px",
            height: "90%",
            width: "90%",
            marginTop: "11%",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgb(234, 236, 239)",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          <Box
            sx={{
              // border: "solid orange 1px",
              // height: "90%",
              width: "80%",
              marginTop: "5%",
              fontWeight: "600",
              fontSize: "20px",
              // borderRadius: "25px",
            }}
          >
            Hourly Wind & Humidity{" "}
          </Box>
          <Box
            sx={{
              // border: "solid orange 1px",
              height: "90%",
              width: "95%",
              marginTop: "2%",
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              overflow: "scroll",
              scrollbarWidth: "none",

              msOverflowStyle: "none",
              paddingTop: "10px",
            }}
          >
            {futureWeather?.forecast?.forecastday[0]?.hour?.map((cur) => {
              return loading ? (
                <Skeleton animation="wave" width={400} height={100} />
              ) : (
                <Box
                  sx={{
                    // border: "solid orange 1px",
                    minHeight: "10vh",
                    width: "88%",
                    // marginTop: "11%",
                    borderRadius: "15px",
                    padding: "10px",
                    paddingLeft: "7%",
                    paddingRight: "7%",
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "10px",
                    background: "white",
                    fontWeight: "500",
                    boxShadow:
                      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                  }}
                  key={nanoid()}
                >
                  <Box sx={{ fontWeight: "500" }}>
                    {cur?.time.slice(-5, -3) > 12
                      ? Number(cur?.time.slice(-5, -3)) - 12
                      : cur?.time.slice(-5, -3) - 0}
                    {Number(cur?.time.slice(11, 13)) >= 12 ? " pm" : " am"}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ fontWeight: "500" }}>Humidity</Box>
                    <Box sx={{ fontWeight: "500" }}>{cur?.humidity}💧</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ fontWeight: "500", minWidth: "100px" }}>
                      Wind Speed
                    </Box>
                    <Box
                      sx={{
                        fontWeight: "500",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {cur?.wind_kph} kp/h{" "}
                      <img
                        src={blowing_snow_icon}
                        style={{ height: "18px", paddingLeft: "5px" }}
                      />{" "}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default WeatherMain;
