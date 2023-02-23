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
