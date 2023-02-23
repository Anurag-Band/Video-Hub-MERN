const Video = require('../models/videoModel');
const catchAsync = require('../middlewares/catchAsync');

// Creator Upload Video
exports.creatorUploadVideo = catchAsync(async (req, res, next) => {
  const { title, description, video } = req.body;

  const newVideo = await Video.create({
    title,
    description,
    video,
    thumbnail: req.file.location,
  });

  res.status(200).json({
    success: true,
    newVideo,
  });
});

// get All Videos
exports.getAllVideos = catchAsync(async (req, res, next) => {
  const videos = await Video.find();

  res.status(200).json({
    success: true,
    videos,
  });
});

// User Likes a Video
exports.userLikesVideo = catchAsync(async (req, res, next) => {
  const currentUser = req.user?._id;
  const { videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) {
    return next(new ErrorHandler('Video Not Found', 404));
  }

  if (video.likes.includes(currentUser)) {
    const index = video.likes.indexOf(currentUser);

    video.likes.splice(index, 1);
    await video.save();

    return res.status(200).json({
      success: true,
      message: 'Video Unliked!',
      isLiked: false,
    });
  } else {
    video.likes.push(currentUser);

    await video.save();

    return res.status(200).json({
      success: true,
      message: 'Video Liked!',
      isLiked: true,
    });
  }
});
