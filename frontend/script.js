const signup_name = document.querySelector(".signup_name");
const signup_email = document.querySelector(".signup_email");
const signup_password = document.querySelector(".signup_password");
const signup_submit = document.querySelector(".signup_submit");
const signup_email_error = document.querySelector(".signup-email-error");
const email_error = document.querySelector(".email-error");
const email_password = document.querySelector(".password-error");
const urlStart = "http://localhost:3000/api/";

document
  .querySelector(".img__btn")
  .addEventListener("click", async function () {
    document.querySelector(".cont").classList.toggle("s--signup");
  });

const signin_email = document.querySelector(".signin_email");
const signin_password = document.querySelector(".signin_password");
const signin_submit = document.querySelector(".signin_submit");
const signup_phone = document.querySelector(".signup_phone");
const signup_phone_code = document.querySelector(".signup_phone-code");
const overlay = document.querySelector(".overlay");
const otpSubmit = document.querySelector(".otp-submit");
const otpInput = document.querySelector("#otpInput");

//SIGNUP

signup_submit.addEventListener("click", async function (e) {
  e.preventDefault();

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,14}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  const phoneRegex = /^\d{10}$/;
  const codeRegex = /^\+\d{1,3}$/;

  const username = signup_name.value;
  const email = signup_email.value;
  const password = signup_password.value;
  const phone = signup_phone.value;
  const code = signup_phone_code.value;
  let otp;

  if (
    !emailRegex.test(email) ||
    !passwordRegex.test(password) ||
    !phoneRegex.test(phone) ||
    !codeRegex.test(code)
  ) {
    signup_email_error.style.visibility = "visible";

    console.log("all fields should be correct");
  } else {
    signup_email_error.style.visibility = "hidden";

    const otpRequest = await fetch(`${urlStart}otp/${phone}/${code}`);

    const otpData = await otpRequest.json();

    if (otpData.service === "invalid") {
      signup_phone.value = signup_phone_code.value = "";

      console.log("number invalid");
    } else {
      overlay.style.display = "block";

      otpSubmit.addEventListener("click", async function (e) {
        e.preventDefault();

        otp = otpInput.value;

        const verifyRequest = await fetch(
          `${urlStart}otp/${phone}/${code}/${otp}`
        );

        const verifyData = await verifyRequest.json();

        if (verifyData.valid === false) {
          console.log("incorrect otp");
          otpInput.value = "";
        } else {
          console.log("correct otp");

          overlay.style.display = "none";

          const requestOptions = {
            method: "POST", // or 'PUT', 'GET', 'DELETE', etc.
            headers: {
              "Content-Type": "application/json", // Tell the server we are sending JSON data
            },
            body: JSON.stringify({
              username,
              email,
              password,
              phone: `${code}${phone}`,
            }), // Convert the JavaScript object to JSON string
          };

          const req = await fetch(`${urlStart}users/register`, requestOptions);

          if (req.statusText === "Bad Request") {
            signup_email_error.style.visibility = "visible";

            signup_password.value =
              signup_phone.value =
              signup_phone_code.value =
                "";
          } else {
            signup_email_error.style.visibility = "hidden";

            signup_email.value =
              signup_name.value =
              signup_password.value =
              signup_phone.value =
              signup_phone_code.value =
                "";

            const data = await req.json();

            console.log(data._id, data.email, data.phone);
          }
        }
      });
    }
  }
});

//SIGN IN

signin_submit.addEventListener("click", async function (e) {
  e.preventDefault();
  email_error.style.visibility = "hidden";
  email_password.style.visibility = "hidden";

  const email = signin_email.value;
  const password = signin_password.value;

  console.log(email, password);

  const requestOptions = {
    method: "POST", // or 'PUT', 'GET', 'DELETE', etc.
    headers: {
      "Content-Type": "application/json", // Tell the server we are sending JSON data
    },
    body: JSON.stringify({
      email,
      password,
    }), // Convert the JavaScript object to JSON string
  };

  const req = await fetch(`${urlStart}users/login`, requestOptions);

  if (req.statusText === "Bad Request") {
    email_error.style.visibility = "visible";
    email_password.style.visibility = "visible";

    signin_password.value = "";
  } else {
    signin_email.value = signin_password.value = "";
    const token = await req.json();
    console.log(token.acessToken);

    const requestOptions2 = {
      method: "GET", // or 'PUT', 'GET', 'DELETE', etc.
      headers: {
        'Authorization': `Bearer ${token.acessToken}`, // prettier-ignore

        "Content-Type": "application/json", // Tell the server we are sending JSON data
      },
    };
    const req2 = await fetch(`${urlStart}users/current`, requestOptions2);
    const data = await req2.json();
    console.log(data, "hello");
    window.location.href = "../frontend/home.html";
  }
});
