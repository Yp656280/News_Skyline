const fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");

const getNews = asyncHandler(async function (req, res) {
  const request = await fetch(
    `https://newsapi.org/v2/everything?q=${req.params.id}&from=2024-02-01&to=2024-02-29&sortBy=popularity&apiKey=38a047b534c14c8bb57a6867bd0287ef`
  );
  const data = await request.json();
  //console.log(data);
  res.status(200);
  res.json(data);
});

module.exports = { getNews };
