import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import weatherIcon from "../../assets/images/weatherIcon2.png";
import menuIcon from "../../assets/images/menuIcon.png";
import WeatherMain from "./WeatherMain";
import WeatherCities from "./WeatherCities";
import { Navigate, useNavigate } from "react-router-dom";

const Weather = () => {
  const [weatherData, setWeatherData] = useState("");
  const navigate = useNavigate();
  const [display, setDisplay] = useState(<WeatherMain />);

  const weatherHome = () => {
    setDisplay(<WeatherMain />);
  };
  const cities = () => {
    setDisplay(<WeatherCities />);
  };

  return (
    <Box sx={{ width: "98.5vw", height: "120vh", display: "flex" }}>
      <Box
        sx={{
          // border: "solid black 1px",
          width: "8%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // border: "solid black 1px",
            height: "90%",
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(234, 236, 239)",
            borderRadius: "24px",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          <List
            sx={{
              height: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <ListItemButton
              sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100px",
                width: "80%",
              }}
              component="a"
              href="#simple-list"
              onClick={weatherHome}
            >
              <img src={weatherIcon} alt="" className=" h-12 w-12" />

              <ListItemText primary={<strong>Weather</strong>} />
            </ListItemButton>{" "}
            <ListItemButton
              sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100px",
              }}
              component="a"
              href="#simple-list"
              onClick={cities}
            >
              <img src={menuIcon} alt="" className=" h-12 w-12" />

              <ListItemText primary={<strong>Cities</strong>} />
            </ListItemButton>{" "}
            {/* <ListItemButton
              sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100px",
              }}
              onClick={map}
              component="a"
              href="#simple-list"
            >
              <img src={mapIcon} alt="" className=" h-12 w-12" />

              <ListItemText primary={<strong>Map</strong>} />
            </ListItemButton> */}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          // border: "solid black 1px",
          width: "90%",
          display: "flex",
          height: "100%",
        }}
      >
        {display}
      </Box>
    </Box>
  );
};

export default Weather;
