import React, { useState } from "react";
import Input from "../Input";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Otp from "../Otp/Otp";

function SignUp() {
  const [otp, setOtp] = useState(Math.floor(Math.random() * 9000) + 1000);

  const { register, handleSubmit, resetField } = useForm();
  const [error, setError] = useState(" ");
  const [otpVisibility, setOtpVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const signup = async (data) => {
    setError("");
    const response = await fetch(`http://localhost:4000/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        phone: `+91 ${data.phone}`,
      }),
    });
    if (!response.ok) {
      setError("Enter valid details!");
      resetField("email");
      resetField("password");
      console.log("error in signup");
    } else {
      setError("");
      resetField("email");
      resetField("password");
      resetField("phone");
      resetField("username");
      setOtpVisibility(true);
      setEmail(data.email);
      try {
        fetch("http://localhost:4000/api/users/sendOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            otp: `${otp}`,
          }),
        }).then((data) => {});
      } catch (error) {
        console.log("error in sending otp");
      }
    }
  };

  return otpVisibility ? (
    <Otp
      setOtpVisibility={setOtpVisibility}
      otp={otp}
      setOtp={setOtp}
      email={email}
    />
  ) : (
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
          Create your Account
        </h2>
        <p className="mb-2">
          {" "}
          Already have a account?&nbsp;
          <Link to={"/login"}>SignIn?</Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit(signup)} className=" mb-6   w-11/12">
          <div className="space-y-5   w-full">
            <Input
              label="Name:  "
              type="text"
              className="mb-3"
              placeholder="Enter your name"
              {...register("username", {
                required: true,
              })}
            />

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
            <Input
              label="Phone:  "
              type="phone"
              className="mb-3"
              placeholder="Enter your phone"
              {...register("phone", {
                required: true,
                matchPatern: (value) =>
                  /^\d{10}$/.test(value) || "Phone number should be valid ",
              })}
            />

            <Button type="submit" className="w-full  ">
              SignUp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
