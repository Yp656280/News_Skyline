import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./loginStyle.css";
import Otp from "./otp/Otp";
import { Contexts } from "../context/contexts";

function generateOTP() {
  return Math.floor(Math.random() * 9000) + 1000;
}

const error = (type, value) => {
  if (type === "email") {
    document.querySelector(".email-error").style.visibility = `${value}`;
  } else if (type === "password") {
    document.querySelector(".password-error").style.visibility = `${value}`;
  } else if (type === "signup-email") {
    document.querySelector(".signup-email-error").style.visibility = `${value}`;
  } else if (type === "signup-password") {
    document.querySelector(
      ".signup-password-error"
    ).style.visibility = `${value}`;
  } else if (type === "signup-username") {
    document.querySelector(
      ".signup-username-error"
    ).style.visibility = `${value}`;
  } else if (type === "signup-phone") {
    document.querySelector(".signup-phone-error").style.visibility = `${value}`;
  }
};

const Login = () => {
  const [transition, setTransition] = useState("");
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [phoneSignUp, setPhoneSignUp] = useState("");
  const [phoneCodeSignUp, setPhoneCodeSignUp] = useState("");
  const [otpVisibility, setOtpVisibility] = useState(false);
  const [otp, setOtp] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(Contexts);
  // const history = useHistory();
  const toggle = () => {
    if (transition === "s--signup") {
      setTransition("");
    } else {
      setTransition("s--signup");
    }
  };

  const signIN = async () => {
    console.log("signin");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;

    if (!emailRegex.test(emailSignIn) || !passwordRegex.test(passwordSignIn)) {
      error("email", "visible");
      error("password", "visible");
      console.log("all fields should be correct");
    } else {
      error("email", "hidden");

      error("password", "hidden");

      const requestOptions = {
        method: "POST", // or 'PUT', 'GET', 'DELETE', etc.
        headers: {
          "Content-Type": "application/json", // Tell the server we are sending JSON data
        },
        body: JSON.stringify({
          email: emailSignIn,
          password: passwordSignIn,
        }), // Convert the JavaScript object to JSON string
      };

      const request = await fetch(
        "http://localhost:4000/api/users/login",
        requestOptions
      );

      if (request.status === 400) {
        error("email", "visible");
        error("password", "visible");
      } else if (request.status === 404) {
        alert("api m data ni jara");
      } else {
        const token = await request.json();
        const requestOptions2 = {
          method: "GET", // or 'PUT', 'GET', 'DELETE', etc.
          headers: {
            'Authorization': `Bearer ${token.acessToken}`, // prettier-ignore

            "Content-Type": "application/json", // Tell the server we are sending JSON data
          },
        };
        const request2 = await fetch(
          `http://localhost:4000/api/users/current`,
          requestOptions2
        );
        localStorage.setItem("token", JSON.stringify(token.acessToken));
        const data = await request2.json();
        console.log(data);
        setIsLoggedIn(true);
        navigate("/home");
        setEmailSignIn("");
        setPasswordSignIn("");
      }
    }
  };

  const signUp = async () => {
    console.log("in");
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,14}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;
    const phoneRegex = /^\d{10}$/;
    const codeRegex = /^\+\d{1,3}$/;
    const otp1 = `${generateOTP()}`;
    setOtp(otp1);
    if (
      !emailRegex.test(emailSignUp) ||
      !passwordRegex.test(passwordSignUp) ||
      !phoneRegex.test(phoneSignUp) ||
      !codeRegex.test(phoneCodeSignUp)
    ) {
      error("signup-email", "visible");
      error("signup-password", "visible");
      error("signup-username", "visible");
      error("signup-phone", "visible");
    } else {
      error("signup-email", "hidden");
      error("signup-password", "hidden");
      error("signup-username", "hidden");
      error("signup-phone", "hidden");
      console.log("in2", otp);
      setOtpVisibility(true);
      setDisabled(true);

      const requestOptions = {
        method: "POST", // or 'PUT', 'GET', 'DELETE', etc.
        headers: {
          "Content-Type": "application/json", // Tell the server we are sending JSON data
        },
        body: JSON.stringify({
          username: nameSignUp,
          email: emailSignUp,
          password: passwordSignUp,
          phone: `${phoneCodeSignUp}${phoneSignUp}`,
          otp: otp1,
        }), // Convert the JavaScript object to JSON string
      };

      const req = await fetch(
        `http://localhost:4000/api/users/register`,
        requestOptions
      );
      console.log("in22");
      if (req.status !== 201) {
        error("signup-email", "visible");
        error("signup-password", "visible");
        error("signup-username", "visible");
        error("signup-phone", "visible");
      } else if (req.status === 201) {
        error("signup-email", "hidden");
        error("signup-password", "hidden");
        error("signup-username", "hidden");
        error("signup-phone", "hidden");
        const user = await req.json();
        console.log(user);
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    signUp();
  };
  const handleSubmitSignIn = (event) => {
    event.preventDefault();

    signIN();
  };

  return (
    <>
      {" "}
      <br />
      <br />
      <div className={`cont ${transition}`}>
        {" "}
        <form onSubmit={handleSubmitSignIn}>
          <div className="form sign-in">
            <h2>Welcome</h2>
            <label>
              <span>Email</span>
              <input
                className="signin_email"
                type="email"
                value={emailSignIn}
                onChange={(event) => setEmailSignIn(event.target.value)}
              />
            </label>
            <p className="email-error">please check the email !</p>
            <label>
              <span>Password</span>
              <input
                className="signin_password"
                type="password"
                value={passwordSignIn}
                onChange={(event) => setPasswordSignIn(event.target.value)}
              />
            </label>
            <p className="password-error">please check the password !</p>

            <p className="forgot-pass"></p>
            <button
              type="submit"
              className="submit signin_submit"
              onSubmit={() => signIN()}
            >
              Sign In
            </button>
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h3>Don't have an account? Please Sign up!</h3>
              </div>
              <div className="img__text m--in">
                <h3>If you are already a member, please log in.</h3>
              </div>
              <div
                className="img__btn"
                onClick={() => (disabled ? "" : toggle())}
              >
                <span className={`m--up`}>Sign Up</span>
                <span className="m--in">Sign In</span>
              </div>
            </div>
            <div className="form sign-up">
              <div
                className={
                  disabled
                    ? "fixed top-0 left-0 w-full h-full  bg-white-200 bg-opacity-70 backdrop-blur-lg "
                    : ""
                }
              >
                {" "}
                <Otp
                  email={emailSignUp}
                  visibility={otpVisibility}
                  setOtpVisibility={setOtpVisibility}
                  otp={otp}
                  setEmailSignUp={setEmailSignUp}
                  setNameSignUp={setNameSignUp}
                  setPasswordSignUp={setPasswordSignUp}
                  setPhoneCodeSignUp={setPhoneCodeSignUp}
                  setPhoneSignUp={setPhoneSignUp}
                  setOtp={setOtp}
                  setDisabled={setDisabled}
                />
              </div>

              <h2>Create your Account</h2>
              <label>
                <span>Name</span>
                <input
                  className="signup_name"
                  type="text"
                  value={nameSignUp}
                  onChange={(event) => setNameSignUp(event.target.value)}
                />
              </label>
              <p className="signup-username-error">! Use another name</p>

              <label>
                <span>Email</span>
                <input
                  className="signup_email"
                  type="email"
                  value={emailSignUp}
                  onChange={(event) => setEmailSignUp(event.target.value)}
                />
              </label>
              <p className="signup-email-error">! Use another email</p>
              <label>
                <span>Password</span>
                <input
                  className="signup_password"
                  type="password"
                  value={passwordSignUp}
                  onChange={(event) => setPasswordSignUp(event.target.value)}
                />
              </label>
              <p className="signup-password-error">! Use another password</p>

              <label>
                <span>Phone Number</span>
                <div className="phone-number">
                  <input
                    type="text"
                    placeholder="+91"
                    value={phoneCodeSignUp}
                    className="signup_phone-code"
                    onChange={(event) => setPhoneCodeSignUp(event.target.value)}
                  />

                  <input
                    className="signup_phone"
                    type="tel"
                    value={phoneSignUp}
                    onChange={(event) => setPhoneSignUp(event.target.value)}
                  />
                </div>
              </label>
              <p className="signup-phone-error">! Use another phone</p>

              <button
                type="submit"
                className="submit signup_submit"
                onSubmit={() => signUp()}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
