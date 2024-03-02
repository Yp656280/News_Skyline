const signup_name = document.querySelector(".signup_name");
const signup_email = document.querySelector(".signup_email");
const signup_password = document.querySelector(".signup_password");
const signup_submit = document.querySelector(".signup_submit");
const email_error = document.querySelector(".email-error");
const email_password = document.querySelector(".password-error");
const urlStart = "http://localhost:3000/api/"
document
  .querySelector(".img__btn")
  .addEventListener("click", async function () {
    document.querySelector(".cont").classList.toggle("s--signup");
  });

const signin_email = document.querySelector(".signin_email");
const signin_password = document.querySelector(".signin_password");
const signin_submit = document.querySelector(".signin_submit");

//SIGNUP

signup_submit.addEventListener("click", async function (e) {
  e.preventDefault();

  const username = signup_name.value;
  const email = signup_email.value;
  const password = signup_password.value;
  email_error.style.visibility = "hidden";

  console.log(email, password);

  const requestOptions = {
    method: "POST", // or 'PUT', 'GET', 'DELETE', etc.
    headers: {
      "Content-Type": "application/json", // Tell the server we are sending JSON data
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }), // Convert the JavaScript object to JSON string
  };

  const req = await fetch(
    `${urlStart}users/register`,
    requestOptions
  );
  if (req.statusText === "Bad Request") {
    email_error.style.visibility = "visible";

    signup_password.value = "";
  } else {
    // email_error.style.visibility = "hidden";

    signup_email.value = signup_name.value = signup_password.value = "";
  }
  const data = await req.json();
  console.log(data._id, data.email);
});
0;

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

  const req = await fetch(
    `${urlStart}api/users/login`,
    requestOptions
  );

  if (req.statusText === "Bad Request") {
    email_error.style.visibility = "visible";
    email_password.style.visibility = "visible";

    signin_password.value = "";
  } else {
    signin_email.value = signin_password.value = "";
    const token = await req.json();
    console.log(token.acessToken);
    window.location.href = "../frontend/home.html";

    const requestOptions2 = {
      method: "GET", // or 'PUT', 'GET', 'DELETE', etc.
      headers: {
        'Authorization': `Bearer ${token.acessToken}`, // prettier-ignore

        "Content-Type": "application/json", // Tell the server we are sending JSON data
      },
    };
    const req2 = await fetch(
      `${urlStart}/users/current`,
      requestOptions2
    );
    const data = await req2.json();
    //console.log("--data--",data);
  }
});
