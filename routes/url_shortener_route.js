const express = require("express");
const router = express.Router();

const urlShortenController = require("../controllers/url_shortener_controller");

router.post("/", urlShortenController.createShortUrl);
router.get("/:alias", urlShortenController.getRedirectedUrl);

module.exports = router;
