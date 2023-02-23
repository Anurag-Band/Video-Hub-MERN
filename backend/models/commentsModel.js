const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentsSchema = mongoose.Schema(
  {
    video: {
      type: ObjectId,
      ref: 'videos',
      required: [true, 'Please provide video informations'],
    },
    main: {
      user: {
        type: ObjectId,
        ref: 'users',
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
          ref: 'users',
          required: [true, 'Please provide user informations'],
        },
        content: {
          type: String,
          trim: true,
          required: [true, 'Please provide comment content'],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentsSchema);