import React, { createContext, useState, useContext, useEffect } from "react";
export const Contexts = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function ContextsProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState();
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
  return (
    <Contexts.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </Contexts.Provider>
  );
}
