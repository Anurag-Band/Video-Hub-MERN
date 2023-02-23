const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your full name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      validate: [validator.isEmail, 'Email is not Valid'],
      unique: [true, 'Email already exists'],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      select: false,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 2,
          }),
        message:
          'Password should be atleast 8 characters with 1 uppercase, 2 numbers & 1 symbol',
      },
    },
    profilePic: {
      type: String,
      required: [true, 'Profile Picture is required'],
    },
    role: {
      type: String,
      enum: {
        values: ['creator', 'student'],
        message: 'user role not found',
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
