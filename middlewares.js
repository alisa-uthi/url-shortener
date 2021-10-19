const errorHandler = (error, req, res, next) => {
  res.status(res.statusCode || 500).json({
    error: error.message,
    stack: process.env.NODE_ENV === "production" ? "stack" : error.stack,
  });
};

module.exports = {
  errorHandler,
};
