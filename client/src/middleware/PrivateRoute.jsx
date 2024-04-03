// import React, { useEffect, useState, useContext } from "react";
// import { Outlet } from "react-router-dom";

// import { Navigate } from "react-router-dom";

// import { Contexts } from "../context/contexts";
// const PrivateRoute = () => {
//   const { isLoggedIn } = useContext(Contexts);

//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     setIsAuthenticated(isLoggedIn);
//     console.log(isLoggedIn);
//   }, [isLoggedIn]);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />; // Redirect to login page
//   }

//   return <Outlet />;
// };

// export default PrivateRoute;

// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   useEffect(async () => {
// //     // const token = localStorage.getItem("token");
// //     // if (token) {
// //     //   try {
// //     //     const options = {
// //     //       method: "POST",
// //     //       headers: {
// //     //         "Content-Type": "application/json",
// //     //       },
// //     //       body: { token },
// //     //     };
// //     //     const req = fetch(
// //     //       `http://localhost:4000/api/users/checkToken`,
// //     //       options
// //     //     );
// //     //     if (!req.ok) {
// //     //       throw new Error(`HTTP error! Status: ${req.status}`);
// //     //     }
// //     //     const data = await req.json();
// //     //     setIsAuthenticated(data);
// //     //   } catch (error) {
// //     //     console.error("Fetch error:", error.message);
// //     //     setIsAuthenticated(false);
// //     //   }
// //     // }
// //   }, []);
