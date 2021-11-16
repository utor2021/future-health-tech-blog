const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const discussionSchema = new Schema(
  {
    topicTitle: {
      type: String,
      required: 'You need to create a title!',
      minlength: 1,
      maxlength: 100
    },
    ideaText: {
      type: String,
      required: 'You write an idea!',
      minlength: 1,
      maxlength: 300
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    comments: [commentSchema]
  },
  // not sure if we need this
  {
    toJSON: {
      getters: true
    }
  }
);

// thoughtSchema.virtual('reactionCount').get(function () {
//   return this.reactions.length;
// });

const Discussion = model('Discussion', discussionSchema);

module.exports = Discussion;
