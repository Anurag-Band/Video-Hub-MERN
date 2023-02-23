const express = require('express');
const {
  loginUser,
  signupUser,
  logoutUser,
  getLoggedInUserDetails,
} = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');
const { upload } = require('../utils/awsFunctions');

const router = express();

router.route('/signup').post(upload.single('profilePic'), signupUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticated, getLoggedInUserDetails);

module.exports = router;
