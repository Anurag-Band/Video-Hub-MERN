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
         type: ObjectId,
         ref: 'baseComments',
      },
      replies: [
         {
            type: ObjectId,
            ref: 'baseComments',
         },
      ],
   },
   {
      timestamps: true,
   }
);

module.exports = commentsSchema;