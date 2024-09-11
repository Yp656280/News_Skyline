import { Outlet, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [authentication, setAuthentication] = useState(false);
  const status = sessionStorage?.getItem("status");
  const token = sessionStorage?.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status) {
      try {
        const response = fetch(`http://localhost:4000/api/users/checkToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        })
          .then((data) => data.json())
          .then((data) => {
            if (data) {
              setAuthentication(data);
            } else {
              sessionStorage.clear();
              dispatch(logout());
              navigate("/login");
            }
          });
      } catch (error) {
        console.log("error in checking token");
      }
    } else {
      dispatch(logout());
      navigate("/login");
    }
  }, [location]);
  const handleSearchInputChange = (e) => {
    const { pathname } = location;
    setSearchQuery(e.target.value);
    console.log(e.target.value === "");
    if (e.target.value === "") {
      setSearchQuery("Indore");
    }

    if (pathname.includes("/home/news")) {
      navigate(
        `/home/news/${e.target.value === "" ? "indore" : e.target.value}`
      );
    } else if (pathname.includes("/home/weather")) {
      navigate(
        `/home/weather/${e.target.value === "" ? "indore" : e.target.value}`
      );
    }
  };
  return authentication ? (
    <>
      <div className="flex flex-col justify-between w-full h-screen">
        {" "}
        <Header onSearchInputChange={handleSearchInputChange} />
        <Outlet />
        <Footer />
      </div>
    </>
  ) : (
    <></>
  );
}

export default App;
