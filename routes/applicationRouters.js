const express = require("express");
const router = express.Router();

const multer = require("multer");

const authHandler = require("../middleware/authHandler");

const {
  createApplication,
  updateApplication,
  getApplications,
  deleteApplication,
} = require("../controllers/applicationController");

const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .post(
    authHandler,
    upload.fields([
      { name: "aadhar_card" },
      { name: "id_card" },
      { name: "academic_certificate" },
    ]),
    createApplication
  )
  .get(authHandler, getApplications);

router
  .route("/:id")
  .patch(authHandler, updateApplication)
  .delete(authHandler, deleteApplication);

module.exports = router;
