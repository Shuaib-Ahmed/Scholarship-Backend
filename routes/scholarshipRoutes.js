const express = require("express");
const router = express.Router();

const authHandler = require("../middleware/authHandler");
const {
  createScholarship,
  getScholarship,
  getScholarships,
} = require("../controllers/scholarshipControllers");

router.route("/").post(authHandler, createScholarship).get(getScholarships);
router.route("/:id").get(getScholarship);

module.exports = router;
