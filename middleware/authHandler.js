const CustomError = require("../error/CustomError");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Unauthorized user please login");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { user_id, isAdmin } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { user_id, isAdmin };

    next();
  } catch (error) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Unauthorized user please login");
  }
};

module.exports = authHandler;
