const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentsSchema = mongoose.Schema(
  {
    video: {
      type: ObjectId,
      ref: 'Video',
      required: [true, 'Please provide video informations'],
    },
    mainComment: {
      user: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'Please provide user informations'],
      },
      content: {
        type: String,
        trim: true,
        required: [true, 'Please provide comment content'],
      },
    },
    replies: [
      {
        user: {
          type: ObjectId,
          ref: 'User',
          required: [true, 'Please provide user informations'],
        },
        content: {
          type: String,
          trim: true,
          required: [true, 'Please provide comment content'],
        },
        repliedAt: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentsSchema);