import React, { useState } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";

import sunIcon from "../../assets/images/sunIcon.png";
import thermometer from "../../assets/images/thermometer.png";
import wind from "../../assets/images/wind.png";
import sun from "../../assets/images/sun.png";
import watrerDroplet from "../../assets/images/water droplet.png";
// import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

function WeatherMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCOxSFSKHRYoi6OwD2yij8icmEbFEu0kYc",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  return (
    <>
      {" "}
      <Box
        sx={{
          // border: "solid black 1px",
          width: "65%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItem: "center",
        }}
      >
        {" "}
        <Box
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
        </Box>
        <Box
          sx={{
            border: "solid red 1px",
            width: "56vw",
            height: "80%",
            padding: "20px",
            marginBottom: "20px",
            marginTop: "20px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            borderRadius: "20px",
          }}
        ></Box>
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
            marginTop: "5%",
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
            <Box sx={{ fontSize: "300%" }}>Madrid</Box>
            <Box sx={{ marginTop: "-10%" }}>chance of rain: 0%</Box>
            <Box sx={{ fontSize: "400%" }}>31</Box>
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
          }}
        >
          Todays Forecast
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
              <Box>6Am</Box>
              <Box sx={{ height: "33.33%" }}>
                <img
                  src={sunIcon}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </Box>
              <Box sx={{ fontSize: "200%" }}>25</Box>
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
              <Box>6Am</Box>
              <Box sx={{ height: "33.33%" }}>
                <img
                  src={sunIcon}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </Box>
              <Box sx={{ fontSize: "200%" }}>25</Box>
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
              <Box>6Am</Box>
              <Box sx={{ height: "33.33%" }}>
                <img
                  src={sunIcon}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </Box>
              <Box sx={{ fontSize: "200%" }}>25</Box>
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
                }}
              >
                {" "}
                <img
                  src={sunIcon}
                  style={{ width: "50%", height: "80%" }}
                  alt=""
                />
                Sunny
              </Box>{" "}
              36/22
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
                }}
              >
                {" "}
                <img
                  src={sunIcon}
                  style={{ width: "50%", height: "80%" }}
                  alt=""
                />
                Sunny
              </Box>{" "}
              36/22
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
                }}
              >
                {" "}
                <img
                  src={sunIcon}
                  style={{ width: "50%", height: "80%" }}
                  alt=""
                />
                Sunny
              </Box>{" "}
              36/22
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default WeatherMap;
