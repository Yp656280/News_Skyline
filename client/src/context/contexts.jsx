import React, { createContext, useState, useContext, useEffect } from "react";
import {
  GetCurrentWeather,
  GetFutureWeather,
  GetCurrentLocation,
} from "../Controller/weatherController";
import { useParams } from "react-router-dom";

export const Contexts = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currentWeather: "",
  setCurrentWeather: (todo) => {},
  futureWeather: "",
  setFutureWeather: () => {},
  allWeather: "",
  setAllWeather: () => {},
  activeWeather: "",
  setActiveWeather: () => {},
  weatherSearch: "",
});

export function ContextsProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentWeather, setCurrentWeather] = useState("");
  const [futureWeather, setFutureWeather] = useState("");
  const [allWeather, setAllWeather] = useState([]);
  const [activeWeather, setActiveWeather] = useState([]);
  const { weatherSearch } = useParams();

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
          };
          const req = await fetch(
            `http://localhost:4000/api/users/checkToken`,
            options
          );
          if (!req.ok) {
            throw new Error(`HTTP error! Status: ${req.status}`);
          }
          const data = await req.json();

          setIsLoggedIn(data);
          console.log(isLoggedIn);
        } catch (error) {
          console.error("Fetch error:", error.message);
          setIsLoggedIn(false);
        }
      }
    };
    check();
  }, []);

  useEffect(() => {
    // console.log("test",weatherSearch)
    const loadData = async () => {
      const currentLocation = await GetCurrentLocation();
      // console.log(currentLocation);

      const currentWeatherData = await GetCurrentWeather(currentLocation.city);
      setCurrentWeather(currentWeatherData);
      // console.log(currentWeatherData);
      const futureWeatherData = await GetFutureWeather(currentLocation.city);
      setFutureWeather(futureWeatherData);
      // console.log(futureWeatherData);
    };
    loadData();
  }, []);

  return (
    <Contexts.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setCurrentWeather,
        currentWeather,
        futureWeather,
        setFutureWeather,
        allWeather,
        setAllWeather,
        activeWeather,
        setActiveWeather,
      }}
    >
      {children}
    </Contexts.Provider>
  );
}
