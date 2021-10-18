const mongoose = require("mongoose");

const UrlShortenerSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  alias: {
    type: String,
    lowercase: true,
    trim: true,
  },
});

module.exports = mongoose.model("UrlShortener", UrlShortenerSchema);
