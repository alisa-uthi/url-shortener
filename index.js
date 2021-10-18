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
app.use(middlewares.errorHandler);

const urlShortenerRoute = require("./routes/url_shortener_route");

app.use("/", urlShortenerRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
