const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please provide first name"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Please provide last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    trim: true,
  },
  phone_no: {
    type: Number,
    required: [true, "Please provide phone number"],
  },
  state: {
    type: String,
    required: [true, "Please provide state"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
    trim: true,
  },
  academic_certificate: {
    type: String,
    required: [true, "Please provide academic certificate"],
    trim: true,
  },
  id_card: {
    type: String,
    required: [true, "Please provide id card"],
    trim: true,
  },
  aadhar_card: {
    type: String,
    required: [true, "Please provide aadhar card"],
    trim: true,
  },
  scholarship_detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "scholarships",
    required: [true, "Please provide scholarship id"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide user id"],
  },
  status: {
    type: String,
    required: [true, "Please provide status"],
    enum: {
      values: ["pending", "accept", "reject"],
      message: "{VALUE} is not a valid option",
    },
    default: "pending",
  },
});

module.exports = mongoose.model("applications", ApplicationSchema);
