const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
require("dotenv").config();

const middlewares = require("./middlewares");
const connectDB = require("./config/database");

connectDB();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}
app.use(express.json());
app.use(cors());

const urlShortenerRoute = require("./routes/url_shortener_route");

app.use("/api/v1/", urlShortenerRoute);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
