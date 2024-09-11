import React, { useEffect, useState } from "react";
import Input from "../Input";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login as authLogin,
  logout as authLogout,
} from "../../store/authSlice";
function Login() {
  const { register, handleSubmit, resetField } = useForm();
  const [error, setError] = useState(" ");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      fetch(`http://localhost:4000/api/users/checkToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      })
        .then((data) => data.json())
        .then((status) => {
          if (status) {
            dispatch(authLogin({ token: token }));
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("status", status);
            navigate("/home");
          } else {
            dispatch(authLogout());
            sessionStorage.clear();
          }
        });
    }
  }, [token]);

  const login = async (data) => {
    setError("");
    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (!response.ok) {
        setError("check your email and password!");
        resetField("password");
        console.log("error in login");
      } else {
        const data = await response.json();
        setToken(data.acessToken);
        resetField("email");
        resetField("password");
      }
    } catch (error) {
      console.log("error in login", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <div
        className="  max-w-lg rounded-xl  bg-gray-100 flex flex-col justify-center items-center "
        style={{
          boxShadow:
            " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <div className=" w-1/2 mb-2 ">
          <img src={logo} className="  mix-blend-multiply" alt="" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight mb-1">
          Sign In to your Account
        </h2>
        <p className="mb-2">
          {" "}
          Don&apos;t have any account?&nbsp;
          <Link to={"/signup"}>SignUp?</Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit(login)} className=" mb-6   w-11/12">
          <div className="space-y-5   w-full">
            <Input
              label="Email:  "
              type="email"
              className="mb-3"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              })}
            />
            <Input
              label="Password:  "
              type="password"
              className="mb-3"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full  ">
              SignIn
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
