const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
// const router = express.Router();.
const cors = require("cors"); // Import the cors middleware

const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

connectDb();

app.use(express.json());

//app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route not found");
});
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
