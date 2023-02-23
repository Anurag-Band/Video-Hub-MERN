const User = require('../models/userModel');
const catchAsync = require('../middlewares/catchAsync');
const sendCookie = require('../utils/sendCookie');
const ErrorHandler = require('../utils/errorHandler');

// Signup User
exports.signupUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (user) {
    if (user.username === username) {
      return next(new ErrorHandler('Username already exists', 401));
    }
    return next(new ErrorHandler('Email already exists', 401));
  }

  const newUser = await User.create({
    username,
    email,
    password,
    profilePic: req.file.location,
  });

  sendCookie(newUser, 201, res);
});

// Login User
exports.loginUser = catchAsync(async (req, res, next) => {
  const { userId, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: userId }, { username: userId }],
  }).select('+password');

  if (!user) {
    return next(new ErrorHandler("User doesn't exist", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password doesn't match", 401));
  }

  sendCookie(user, 201, res);
});

// Logout User
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

// Get User Details --Logged In User
exports.getLoggedInUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});
