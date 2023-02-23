const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const baseCommentsSchema = mongoose.Schema(
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
         minLength: [1, 'Comment text must be atleast 1 characters long'],
         maxLenght: [200, 'Comment text must be maximum 200 characters long'],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = baseCommentsSchema;