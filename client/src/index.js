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
import Login from "./Components/Login";
import Home from "./Components/Home";
import NewsCard from "./Components/NewsCard";
import Weather from "./Components/Weather";

//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/home",
//     element: <App />,
//     children: [
//       { path: "", element: <Home /> },
//       { path: "news", element: <NewsCard /> },
//       { path: "weather", element: <Weather /> },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="home" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="news/:newsSearch" element={<NewsCard />} />
        <Route path="weather/:weatherSearch" element={<Weather />} />
      </Route>
    </>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
