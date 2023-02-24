const mongoose = require('mongoose');
const validator = require('validator');

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide a video title'],
      minLength: [3, 'Video title must be atleast 3 characters long'],
      maxLenght: [150, 'Video title must be maximum 150 characters long'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Please provide a video description'],
      minLength: [5, 'Video description must be atleast 5 characters long'],
      maxLenght: [
        1000,
        'Video description must be maximum 1000 characters long',
      ],
    },
    thumbnail: {
      type: String,
      required: [true, 'Please provide a video thumbnail link'],
      validate: [validator.isURL, 'Please provide a valid thumbnail url'],
    },
    video: {
      type: String,
      required: [true, 'Please provide a video link'],
      validate: [validator.isURL, 'Please provide a valid video url'],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide creator informations'],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);
