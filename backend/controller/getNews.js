const fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");

const getNews = asyncHandler(async function (req, res) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Subtract 15 days from the current date
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 20);

  // Get year, month, and day of the past date
  const pastYear = pastDate.getFullYear();
  const pastMonth = String(pastDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const pastDay = String(pastDate.getDate()).padStart(2, "0");

  // Format the past date
  const formattedPastDate = `${pastYear}-${pastMonth}-${pastDay}`;
  const request = await fetch(
    `https://newsapi.org/v2/everything?q=${req.params.id}&from=${formattedPastDate}&to=${formattedDate}&sortBy=popularity&apiKey=38a047b534c14c8bb57a6867bd0287ef`
  );
  const data = await request.json();
  //console.log(data);
  res.status(200);
  res.json(data);
});

module.exports = { getNews };
