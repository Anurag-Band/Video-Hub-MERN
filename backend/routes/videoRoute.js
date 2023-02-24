const express = require('express');
const router = express();

const {
  creatorUploadVideo,
  getAllVideos,
  userLikesVideo,
  getVideoById,
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
router.route('/video/like/:videoId').put(isAuthenticated, userLikesVideo);

router.route('/video/:videoId').get(isAuthenticated, getVideoById);

module.exports = router;