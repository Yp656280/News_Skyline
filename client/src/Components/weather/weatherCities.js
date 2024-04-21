import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import { Contexts } from "../../context/contexts";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {
  GetCurrentWeather,
  GetFutureWeather,
  GetCurrentLocation,
} from "../../Controller/weatherController";
import sunIcon from "../../assets/images/sunIcon.png";
import thermometer from "../../assets/images/thermometer.png";
import wind from "../../assets/images/wind.png";
import sun from "../../assets/images/sun.png";
import watrerDroplet from "../../assets/images/water droplet.png";
import { nanoid } from "nanoid";

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
function WeatherCities() {
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
    if (hour > 17) {
      icon = night_icon;
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
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [selectedDiv, setSelectedDiv] = useState("");
  const [search, setSearch] = useState("");
  const { allWeather, setAllWeather, activeWeather, setActiveWeather } =
    useContext(Contexts);

  const searchWeather = async (city) => {
    setSearch("");
    const data = await GetFutureWeather(city);
    setAllWeather([...allWeather, data]);
  };
  const handleClick = (index, cur) => {
    setSelectedDiv(index);
    console.log(cur);
    setActiveWeather(cur);
  };
  return (
    <>
      {" "}
      <Box
        sx={{
          // border: "solid black 1px",
          width: "65%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItem: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            minHeight: "8%",
            width: "98%",
            marginTop: "20px",
            // border: "solid black 1px",
          }}
        >
          <form
            action=""
            style={{ height: "100%" }}
            onSubmit={(e) => searchWeather(search)}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </Box>
        <Box
          sx={{
            // border: "solid red 1px",
            width: "98%",
            overflow: "scroll",
            minHeight: "50%",
            padding: "20px",
            paddingBottom: "10px",
            marginBottom: "20px",
            marginTop: "20px",
            scrollbarWidth: "none",

            msOverflowStyle: "none",
            // margin: "20px",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            borderRadius: "25px",
          }}
        >
          {allWeather.map((cur, index) => {
            return (
              <Box
                sx={{
                  // border: "solid black 1px",
                  width: "96%",
                  height: "18vh",
                  margin: "10px",
                  borderRadius: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "3%",
                  paddingRight: "6%",
                  backgroundColor:
                    selectedDiv === index ? "white" : "rgb(234, 236, 239)",
                  border: selectedDiv === index ? "solid blue 1px" : "none",
                }}
                onClick={() => handleClick(index, cur)}
              >
                <Box
                  sx={{
                    // border: "solid black 1px",

                    height: "100%",
                  }}
                >
                  <img src={sunIcon} className=" h-full" alt="" />
                </Box>
                <Box
                  sx={{
                    // border: "solid black 1px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    // marginLeft: "10%",
                    fontSize: "205%",
                  }}
                >
                  <Box sx={{ fontWeight: "600" }}>{cur?.location?.name}</Box>
                  <Box></Box>
                </Box>
                <Box
                  sx={{
                    // border: "solid black 1px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    // marginLeft: "50%",
                    fontSize: "250%",
                    fontWeight: "500",
                  }}
                >
                  {cur?.current?.temp_c} °C
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            width: "100%",
            // border: "solid blue 1px",
            display: "flex",
            justifyContent: "left",
            alignItems: "top",
          }}
        >
          <Box
            sx={{
              height: "98%",
              width: "98%",
              // marginTop: "10px",
              // border: "solid black 1px",
              backgroundColor: "rgb(234, 236, 239) ",
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              paddingRight: "30px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "15%",
                paddingLeft: "20px",
                paddingTop: "5px",
                fontWeight: "500",
                fontSize: "25px",
              }}
            >
              Today's Forecast
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "85%",
                display: "flex",
                overflow: "scroll",
                padding: "10px",
                scrollbarWidth: "none",
                // border: "solid black 1px",
                msOverflowStyle: "none",
              }}
            >
              {activeWeather?.forecast?.forecastday[0].hour.map(
                (hours, index) => (
                  <div
                    className="whitespace-nowrap p-4"
                    style={{
                      height: "100%",
                      minWidth: "120px",
                      // border: "solid black 1px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={nanoid()}
                  >
                    <h2>
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
                    <h1>{hours?.temp_c}°</h1>
                  </div>
                )
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          // border: "solid black 1px",
          width: "35%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          paddingRight: "2%",
        }}
      >
        <Box
          sx={{
            // border: "solid red 1px",
            width: "100%",
            height: "25%",
            display: "flex",
            marginTop: "9%",
            backgroundColor: "rgb(234, 236, 239)",
            borderRadius: "25px",
          }}
        >
          <Box
            sx={{
              // border: "solid green 1px",
              height: "100%",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "left",
              paddingLeft: "5%",
            }}
          >
            <Box sx={{ fontSize: "300%", fontWeight: "500" }}>
              {activeWeather?.location?.name}
            </Box>
            <Box sx={{ marginTop: "-10%" }}>
              chance of rain:{" "}
              {
                activeWeather?.forecast?.forecastday[0]?.hour[12]
                  ?.chance_of_rain
              }
              %
            </Box>
            <Box sx={{ fontSize: "400%", fontWeight: "500" }}>
              {activeWeather?.current?.temp_c}°c
            </Box>
          </Box>
          <Box
            sx={{
              // border: "solid blue 1px",
              height: "100%",
              width: "50%",
              display: "flex",
              flexDirection: "center",
              justifyContent: "center",
            }}
          >
            <img src={sunIcon} alt="" />
          </Box>
        </Box>
        <Box
          sx={{
            paddingLeft: "5%",
            // border: "solid black 1px",
            width: "100%",
            height: "30%",
            backgroundColor: "rgb(234, 236, 239)",
            borderRadius: "25px",
            paddingTop: "3%",
            fontSize: "25px",
            fontWeight: "500",
          }}
        >
          Today's 6 Hour Forecast
          <Box
            sx={{
              width: "100%",
              // border: "solid black 1px",
              height: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                // border: "solid black 1px",
                height: "80%",
                width: "33.333%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontWeight: "500" }}>6Am</Box>
              <Box sx={{ height: "33.33%" }}>
                <img
                  src={sunIcon}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </Box>
              <Box sx={{ fontWeight: "500", fontSize: "100%" }}>
                {activeWeather?.forecast?.forecastday[0]?.hour[6]?.temp_c.toFixed(
                  0
                )}
                °c
              </Box>
            </Box>
            <Box
              sx={{
                // border: "solid black 1px",
                height: "80%",
                width: "33.333%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontWeight: "500" }}>12Pm</Box>
              <Box sx={{ fontWeight: "500", height: "33.33%" }}>
                <img
                  src={sunIcon}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </Box>
              <Box sx={{ fontWeight: "500", fontSize: "100%" }}>
                {" "}
                {activeWeather?.forecast?.forecastday[0]?.hour[12]?.temp_c?.toFixed(
                  0
                )}
                °c
              </Box>
            </Box>
            <Box
              sx={{
                // border: "solid black 1px",
                height: "80%",
                width: "33.333%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontWeight: "500" }}>6Pm</Box>
              <Box sx={{ height: "33.33%" }}>
                <img
                  src={sunIcon}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </Box>
              <Box sx={{ fontWeight: "500", fontSize: "100%" }}>
                {" "}
                {activeWeather?.forecast?.forecastday[0]?.hour[18]?.temp_c?.toFixed(
                  0
                )}
                °c
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            // border: "solid black 1px",
            width: "100%",
            height: "30%",
            marginBottom: "5%",
            paddingLeft: "5%",
            backgroundColor: "rgb(234, 236, 239)",
            borderRadius: "25px",
            paddingTop: "3%",
            fontSize: "25px",
            fontWeight: "500",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          3 Day Forecast
          <Box
            sx={{
              height: "80%",
              width: "100%",
              // border: "solid red 1px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: "20px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                // border: "solid green 1px",
                height: "33%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "20px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Today{" "}
              <Box
                sx={{
                  height: "100%",
                  width: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "-10px",
                }}
              >
                {" "}
                <img
                  src={sunIcon}
                  style={{ width: "70%", height: "80%" }}
                  alt=""
                />
                Sunny
              </Box>{" "}
              {activeWeather?.forecast?.forecastday[0]?.hour[15]?.temp_c?.toFixed(
                0
              )}
              /
              {activeWeather?.forecast?.forecastday[0]?.hour[5]?.temp_c?.toFixed(
                0
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                // border: "solid green 1px",
                height: "33%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "20px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {activeWeather?.forecast?.forecastday[1]?.date?.slice(-2)}/
              {activeWeather?.forecast?.forecastday[1]?.date?.slice(-4, -3)}
              <Box
                sx={{
                  height: "100%",
                  width: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <img
                  src={sunIcon}
                  style={{ width: "70%", height: "80%" }}
                  alt=""
                />
                Sunny
              </Box>{" "}
              {activeWeather?.forecast?.forecastday[1]?.hour[15]?.temp_c?.toFixed(
                0
              )}
              /
              {activeWeather?.forecast?.forecastday[1]?.hour[5]?.temp_c?.toFixed(
                0
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                // border: "solid green 1px",
                height: "33%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "20px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {activeWeather?.forecast?.forecastday[2]?.date?.slice(-2)}/
              {activeWeather?.forecast?.forecastday[2]?.date?.slice(-4, -3)}
              <Box
                sx={{
                  height: "100%",
                  width: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <img
                  src={sunIcon}
                  style={{ width: "70%", height: "80%" }}
                  alt=""
                />
                Sunny
              </Box>{" "}
              {activeWeather?.forecast?.forecastday[2]?.hour[15]?.temp_c?.toFixed(
                0
              )}
              /
              {activeWeather?.forecast?.forecastday[2]?.hour[5]?.temp_c?.toFixed(
                0
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default WeatherCities;
