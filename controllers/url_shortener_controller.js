const validator = require("validator");
const { nanoid } = require("nanoid");

const UrlShortener = require("../models/url_shortener");

const createShortUrl = async (req, res, next) => {
  try {
    let { url, alias } = req.body;

    // Validate Url
    const validUrl = validator.isURL(url, {
      require_protocol: true,
    });

    if (validUrl) {
      if (alias) {
        alias = alias.toLowerCase();

        // Valid alias
        const validAlias = validator.isLength(alias, { max: 5 });
        if (!validAlias) {
          return res.status(400).json({
            error: "Alias should be at maximum of 5 characters long.",
          });
        }
      } else {
        alias = await nanoid(5).toLowerCase();
      }

      // Find existing alias
      const existingAlias = await UrlShortener.findOne({ alias });
      if (existingAlias) {
        return res.status(400).json({
          error: "Alias already exist.",
        });
      }

      // Save new shorten url
      const newShortenUrl = new UrlShortener({
        url,
        alias,
      });
      await newShortenUrl.save();
      return res.status(201).json(newShortenUrl);
    }

    return res.status(400).json({ error: "Invalid URL." });
  } catch (error) {
    next(error);
  }
};

const getRedirectedUrl = async (req, res, next) => {
  try {
    const alias = req.params.alias;

    // Find existing alias
    const existingAlias = await UrlShortener.findOne({ alias });
    if (!existingAlias) {
      return res.status(400).json({
        error: "Alias does not exist.",
      });
    }

    res.redirect(existingAlias.url);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShortUrl,
  getRedirectedUrl,
};
