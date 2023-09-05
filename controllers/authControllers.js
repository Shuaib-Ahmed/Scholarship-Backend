const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error/CustomError");

const registerUser = async (req, res) => {
  const {email, password, conform_password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Email already registered");
  }

  if (password !== conform_password) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Password and Conform Password dose-not match"
    );
  }

  const user = await User.create(req.body);

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ token, isAdmin: user.isAdmin });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Please provide email and password"
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Email not registered");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Password is not correct");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ token, isAdmin: user.isAdmin });
};

module.exports = {
  loginUser,
  registerUser,
};
