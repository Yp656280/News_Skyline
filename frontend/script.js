// const labelEmail = document.querySelector(".email");

// const labelPassword = document.querySelector(".password");
// const submit = document.querySelector(".submit");

// submit.addEventListener("click", async function (e) {
//   e.preventDefault();

//   const email = labelEmail.value;
//   const password = labelPassword.value;

//   console.log(email, password);

//   // const url = "https://api.example.com/data";

//   const requestOptions = {
//     method: "POST", // or 'PUT', 'GET', 'DELETE', etc.
//     headers: {
//       "Content-Type": "application/json", // Tell the server we are sending JSON data
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }), // Convert the JavaScript object to JSON string
//   };

//   const req = await fetch(
//     "http://localhost:5000/api/users/login",
//     requestOptions
//   );
//   console.log(req.statusText === "Bad Request");
//   if (req.statusText === "Bad Request") {
//     alert("sexy");
//   }
//   const data = await req.json();
//   console.log(data);
//   if (data.title === "message") {
//     alert("sexy");
//   }
// });
document
  .querySelector(".img__btn")
  .addEventListener("click", async function () {
    document.querySelector(".cont").classList.toggle("s--signup");
  });

const signup_name = document.querySelector(".signup_name");
const signup_email = document.querySelector(".signup_email");
const signup_password = document.querySelector(".signup_password");
const signup_submit = document.querySelector(".signup_submit");
const email_error = document.querySelector(".email-error");
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
    "http://localhost:5000/api/users/register",
    requestOptions
  );
  if (req.statusText === "Bad Request") {
    email_error.style.visibility = "visible";
    signup_password.value = "";
  } else {
    signup_email.value = signup_name.value = signup_password.value = "";
  }
  const data = await req.json();
  console.log(data._id, data.email);
});
