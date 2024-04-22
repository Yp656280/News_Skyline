import { useContext, useEffect, useState } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";
import { useNavigate, useLocation } from "react-router";
import "./App.css";
import { Contexts } from "./context/contexts";
import Login from "./Components/Login";
function App() {
  const [searchQuery, setSearchQuery] = useState("Indore");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchInputChange = (e) => {
    const { pathname } = location;
    console.log(pathname);

    setSearchQuery(e.target.value || "Indore");
    if (pathname.includes("/home/news")) {
      navigate(`/home/news/${e.target.value || "Indore"}`);
    } else if (pathname.includes("/home/weather")) {
      navigate(`/home/weather/${e.target.value}`);
    }
  };
  const [authenticate, setAuthenticate] = useState(false);
  const { isLoggedIn } = useContext(Contexts);

  useEffect(() => {
    setAuthenticate(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <>
      {true ? (
        <>
          <Header onSearchInputChange={handleSearchInputChange} />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Login />
      )}
      {/* <NewsCard  searchQuery={searchQuery}/> */}
    </>
  );
}

export default App;
