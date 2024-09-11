import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import store from "./store/store.js";
import { Provider } from "react-redux";
import Home from "./components/Home/Home.jsx";
import Weather from "./components/Weather/Weather.jsx";
import News from "./components/News/News.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}></Route>

      <Route path="/signup" element={<SignUp />}></Route>

      <Route path="/" element={<Login />}></Route>

      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="home/news/:newsSearch" element={<News />} />
        <Route path="/home/weather/:weatherSearch" element={<Weather />} />
      </Route>
    </>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
