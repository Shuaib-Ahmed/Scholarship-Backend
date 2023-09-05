const { StatusCodes } = require("http-status-codes");
const Scholarship = require("../models/Scholarship");
const CustomError = require("../error/CustomError");

const createScholarship = async (req, res) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      "Your are not allowed to create scholarships"
    );
  }

  const scholarship = await Scholarship.create(req.body);
  res.status(StatusCodes.CREATED).json(scholarship);
};

const getScholarships = async (req, res) => {
  const queryObject = {};
  const { course, deadline } = req.query;

  if (course) {
    queryObject.course = course;
  }

  if (deadline) {
    queryObject.deadline = { $lte: deadline };
  }

  const limit = req.query.limit || 10;

  const scholarships = await Scholarship.find({ ...queryObject }).limit(limit);

  res.status(StatusCodes.OK).json(scholarships);
};

const getScholarship = async (req, res) => {
  const { id } = req.params;

  const scholarship = await Scholarship.findById(id);

  if (!scholarship) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      `No scholarship found with id : ${id}`
    );
  }

  res.status(StatusCodes.OK).json(scholarship);
};

module.exports = { createScholarship, getScholarships, getScholarship };
