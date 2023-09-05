const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    trim: true,
  },
  conform_password: {
    type: String,
    required: [true, "Please provide confrom password"],
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: [true, "Please provide isAdmin"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(Number(process.env.SALT_ROUND));
  const hashPassword = await bycrypt.hash(this.password, salt);
  this.conform_password = this.password = hashPassword;
});

UserSchema.pre("save", async function () {
  if (this.email === process.env.ADMIN_EMAIL) {
    this.isAdmin = true;
  }
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { user_id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  const match = await bycrypt.compare(password, this.password);
  return match;
};

module.exports = mongoose.model("users", UserSchema);
