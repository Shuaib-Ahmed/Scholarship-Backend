const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "something went wrong",
  };

  // validation error
  if (err.name && err.name === "ValidationError") {
    let message = "";
    for (const field in err.errors) {
      if (message.length) {
        message += "," + err.errors[field].message;
      } else {
        message += err.errors[field].message;
      }
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }

  // duplicate error
  if (err.code && err.code === 11000) {
    let message = `${Object.keys(err.keyValue)[0]} already exist`;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandler;
