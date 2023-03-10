const express = require('express');
const router = express();

const {
  addComment,
  getAllVideoComments,
  replyToComment,
} = require('../controllers/commentController');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/video/comments/:videoId').get(getAllVideoComments);

router.route('/video/comment').post(isAuthenticated, addComment);

router.route('/video/comment/reply').post(isAuthenticated, replyToComment);

module.exports = router;
