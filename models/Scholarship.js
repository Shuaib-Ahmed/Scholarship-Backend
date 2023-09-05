const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
    trim: true,
  },
  course: {
    type: String,
    required: [true, "Please provide course"],
    trim: true,
    enum: {
      values: ["graduation", "post graduation", "phd"],
      message: "{VALUE} is not a valid option"
    }
  },
  amount: {
    type: Number,
    required: [true, "Please provide amount"],
  },
  deadline: {
    type: Date,
    required: [true, "Please provide deadline"],
  }
});

module.exports = mongoose.model("scholarships", ScholarshipSchema);
