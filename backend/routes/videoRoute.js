const express = require('express');
const router = express();

const {
  creatorUploadVideo,
  getAllVideos,
  userLikesVideo,
} = require('../controllers/videoController');
const { isAuthenticated, isValidRole } = require('../middlewares/auth');
const { upload } = require('../utils/awsFunctions');

// creator routes
router
  .route('/video/upload')
  .post(
    isAuthenticated,
    isValidRole('creator'),
    upload.single('videoThumbnail'),
    creatorUploadVideo
  );

// student routes
router.route('/videos/all').get(isAuthenticated, getAllVideos);

// common routes
router.route('/video/like/:videoId').get(isAuthenticated, userLikesVideo);

module.exports = router;