import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/new Logo.png";

const Footer = () => {
  return (
    <footer className="bg-white  shadow dark:bg-gray-900 mt-auto     ">
      <div className="w-full max-w-screen-xl mx-auto p-4 ">
        <div className="sm:flex sm:items-center sm:justify-between ">
          <Link
            to="http://localhost:3000/home"
            className="flex items-center   space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-20 w-60" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white "></span>
          </Link>
        </div>
        {/* <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link to="https://flowbite.com/" className="hover:underline">
            NewsSkyline™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
