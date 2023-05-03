const errorHandler = (err, req, res) => {
  // If we get given back the specified error code then display it || Otherwise show error code 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    msg: err.msg,
    // If we are in product we want no errors to show (null)
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
