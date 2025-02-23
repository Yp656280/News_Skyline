const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");

const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());

connectDb();

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/weather", require("./routes/weatherRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
//app.use("/api/otp", require("./routes/otpRoutes"));
app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route not found");
});
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
