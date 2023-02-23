const Comment = require('../models/commentsModel');
const catchAsync = require('../middlewares/catchAsync');
const ErrorHandler = require('../utils/errorHandler');

// get all Comments for a Video
exports.getAllVideoComments = catchAsync(async (req, res, next) => {
  const { videoId } = req.params;

  if (!videoId) {
    return next(new ErrorHandler('Video Id required!', 401));
  }

  const comments = await Comment.find({
    video: videoId,
  });

  res.status(200).json({
    success: true,
    comments,
  });
});

// User add comment
exports.addComment = catchAsync(async (req, res, next) => {
  const { videoId, commentContent } = req.body;

  if (!videoId) {
    return next(new ErrorHandler('Video Id required!', 401));
  }

  const commentData = {
    user: req.user._id,
    content: commentContent,
    commentedAt: new Date(Date.now()),
  };

  const newComment = await Comment.create({
    video: videoId,
    mainComment: commentData,
  });

  res.status(200).json({
    success: true,
    newComment,
  });
});

// User Reply to a Comment
exports.replyToComment = catchAsync(async (req, res, next) => {
  const { commentId, replyContent } = req.body;

  if (!commentId) {
    return next(new ErrorHandler('Comment Id required!', 401));
  }

  const replyData = {
    user: req.user._id,
    content: replyContent,
    repliedAt: new Date(Date.now()),
  };

  const newComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $push: { replies: replyData },
    },
    {
      upsert: true,
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    newComment,
  });
});
