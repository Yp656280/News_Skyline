import { useState } from "react";
import Header from "./Components/Header";
import NewsCard from "./Components/NewsCard";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";
import { useNavigate, useLocation } from "react-router";
//import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchInputChange = (e) => {
    const { pathname } = location;
    console.log(pathname);
    setSearchQuery(e.target.value);
    if (pathname.includes("/home/news")) {
      navigate(`/home/news/${e.target.value}`);
    } else if (pathname.includes("/home/weather")) {
      navigate(`/home/weather/${e.target.value}`);
    }
  };
  return (
    <>
      <Header onSearchInputChange={handleSearchInputChange} />
      <Outlet />
      <Footer />
      {/* <NewsCard  searchQuery={searchQuery}/> */}
    </>
  );
}

export default App;
