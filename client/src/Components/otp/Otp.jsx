import React, { useState } from "react";
import logo from "../../assets/logo.jpeg";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

function Otp({ otp, setOtpVisibility, setOtp, email }) {
  const { register, handleSubmit, resetField } = useForm();
  const [error, setError] = useState(" ");
  const navigate = useNavigate();
  const checkOtp = async (data) => {
    setError("");
    if (data.otp === `${otp}`) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/setAlive",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }), // Provide the email parameter here
          }
        );
        if (!response.ok) {
          console.log("error in set alive");
        } else {
          resetField("otp");
          navigate("/login");
        }
      } catch (error) {
        console.log("error in set Alive otp");
      }
    } else {
      setError("Enter Correct Otp!");
      resetField("otp");
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
        <h2 className="text-center text-2xl font-bold leading-tight mb-4">
          Verify Otp
        </h2>

        {error && <p className="text-red-600 mt-8 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit(checkOtp)} className=" mb-6   w-11/12">
          <div className="space-y-5   w-full">
            <Input
              label="Enter your otp:"
              type="text"
              className="mb-3  text-center text-lg font-semibold  "
              placeholder="Enter your otp"
              maxLength={4}
              {...register("otp", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full  ">
              Verify
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Otp;
