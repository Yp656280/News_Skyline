import React, { useContext, useEffect, useState } from "react";
import { Contexts } from "../../context/contexts";
import { nanoid } from "nanoid";

import {
  GetCurrentWeather,
  GetFutureWeather,
  GetCurrentLocation,
} from "../../Controller/weatherController";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import sunIcon from "../../assets/images/sunIcon.png";
import thermometer from "../../assets/images/thermometer.png";
import wind from "../../assets/images/wind.png";
import sun from "../../assets/images/sun.png";
import watrerDroplet from "../../assets/images/water droplet.png";
function WeatherMain() {
  const weatherData = {};
  const x = [1, 2, 3, 4, 5, 6, 7];
  const { currentWeather } = useContext(Contexts);

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
            <Box
              sx={{
                fontSize: "350%",
                fontWeight: "bold",
                color: "#202b3bff",
                marginTop: "",
              }}
            >
              {currentWeather.locationName}
            </Box>
            <Box
              sx={{
                fontSize: "100%",
                fontWeight: "bold",
                color: "#9399a2ff",
                marginTop: "-30px",
              }}
            >
              Chance of rain:0%
            </Box>
            <Box
              sx={{
                fontSize: "350%",
                fontWeight: "bold",
                color: "#202b3bff",
                marginTop: "20px",
              }}
            >
              31°
            </Box>
          </Box>
          <Box
            sx={{
              // border: "solid black 1px",
              width: "30%",
            }}
          >
            <img src={sunIcon} alt="" />
          </Box>
        </Box>
        <Box
          sx={{
            height: "25%",
            width: "98%",
            marginTop: "10px",
            // border: "solid black 1px",
            backgroundColor: "rgb(234, 236, 239) ",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "15%",
              paddingLeft: "20px",
              paddingTop: "10px",
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

              msOverflowStyle: "none",
            }}
          >
            {weatherData?.forecast?.forecastday[0].hour.map((hours, index) => (
              <div
                className="whitespace-nowrap p-4"
                style={{ height: "100px", width: "100px" }}
                key={nanoid()}
              >
                <h2>
                  {parseInt(hours.time.substring(11, 13)) > 12
                    ? `${parseInt(hours.time.substring(11, 13)) - 12}pm`
                    : `${hours.time.substring(11, 13)}am`}
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
                <h1>{hours.temp_c}°</h1>
              </div>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            height: "28%",
            width: "98%",
            marginTop: "10px",
            // border: "solid red 1px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(234, 236, 239) ",
            borderRadius: "25px",
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
              width: "100%",
              height: "83.5%",
              // border: "solid red 1px",
              padding: "10px",
            }}
          >
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
                  justifyContent: "",
                  alignItems: "center",
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
                  }}
                >
                  {" "}
                  <img src={thermometer} className="h-8 w-8" alt="" />
                  Real Feel
                </Box>
                <Box sx={{ fontSize: "30px" }}>30C</Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                  }}
                >
                  {" "}
                  <img src={watrerDroplet} className="h-8 w-8" alt="" />
                  Chances of Rain
                </Box>
                <Box sx={{ fontSize: "30px" }}>30C</Box>{" "}
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
                  justifyContent: "space-between",
                  alignItems: "center",
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
                  }}
                >
                  {" "}
                  <img src={wind} className="h-8 w-8" alt="" />
                  Chances of Rain
                </Box>
                <Box sx={{ fontSize: "30px" }}>30C</Box>{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                  }}
                >
                  {" "}
                  <img src={sun} className="h-8 w-8" alt="" />
                  Chances of Rain
                </Box>
                <Box sx={{ fontSize: "30px" }}>30C</Box>{" "}
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
            width: "80%",
            marginTop: "11%",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              // border: "solid orange 1px",
              // height: "90%",
              width: "80%",
              marginTop: "5%",
              // borderRadius: "25px",
            }}
          >
            7 Day Forecast
          </Box>
          <Box
            sx={{
              // border: "solid orange 1px",
              height: "90%",
              width: "95%",
              marginTop: "2%",
              // borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {x.map((cur) => {
              return (
                <Box
                  sx={{
                    // border: "solid orange 1px",
                    height: "13%",
                    width: "85%",
                    // marginTop: "11%",
                    // borderRadius: "25px",
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={nanoid()}
                >
                  <Box>Today</Box>
                  <Box>Sunny</Box>
                  <Box>36/21</Box>
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
