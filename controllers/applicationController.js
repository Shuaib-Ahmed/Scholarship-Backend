const Application = require("../models/Application");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error/CustomError");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const createApplication = async (req, res) => {
  const { user_id } = req.user;
  const { scholarship_detail } = req.body;
  const { aadhar_card, id_card, academic_certificate } = req.files;

  const application = await Application.find({ user_id, scholarship_detail });

  if (application.length) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "You have already applied for this scholarship"
    );
  }

  const { secure_url: aadhar_card_url } = await cloudinary.uploader.upload(
    aadhar_card[0].path
  );
  const { secure_url: id_card_url } = await cloudinary.uploader.upload(
    id_card[0].path
  );
  const { secure_url: academic_certificate_url } =
    await cloudinary.uploader.upload(academic_certificate[0].path);

  const response = await Application.create({
    ...req.body,
    user_id,
    aadhar_card: aadhar_card_url,
    id_card: id_card_url,
    academic_certificate: academic_certificate_url,
  });
  res.status(StatusCodes.CREATED).json(response);
};

const updateApplication = async (req, res) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      "Your are not allowed to update application status"
    );
  }

  const { id } = req.params;

  const { status } = req.body;

  const response = await Application.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json(response);
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;

  const response = await Application.findOneAndDelete({ _id: id });

  res.status(StatusCodes.OK).json(response);
};

const getApplications = async (req, res) => {
  const { user_id, isAdmin } = req.user;
  const queryObject = {};

  if (!isAdmin) {
    queryObject.user_id = user_id;
  }

  if (isAdmin) {
    queryObject.status = { $nin: ["accept", "reject"] };
  }

  const response = await Application.find(queryObject).populate(
    "scholarship_detail",
    "title"
  );
  res.status(StatusCodes.OK).json(response);
};

module.exports = {
  createApplication,
  updateApplication,
  getApplications,
  deleteApplication,
};
