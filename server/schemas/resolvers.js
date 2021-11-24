const { AuthenticationError } = require('apollo-server-express');
const { User, Discussion } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('Discussions')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('Discussions')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('Discussions');
        },
        discussionsall: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Discussion.find(params).sort({ createdAt: -1 });
        },
        discussions: async (parent, { topicTitle }) => {
            const params = topicTitle ? { topicTitle } : {};
            return Discussion.find(params).sort({ createdAt: -1 });
        },
        discussion: async (parent, { _id }) => {
            return Discussion.findOne({ _id });
        }
    },

<<<<<<< HEAD
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // ADD CATEGORIES
    addDiscussion: async (parent, {topicTitle, ideaText}, context) => {
      if (context.user) {
        // const discussion = await Discussion.create({ topicTitle: topicTitle, ideaText:ideaText, username: context.user.username });
        
        let updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { discussions: {topicTitle, ideaText, username: context.user.username} }},
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeDiscussion: async (parent, args, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { discussions: { _id: args._id } } },
          { new: true, runValidators: true, useFindAndModify: false }
        );

        return updateUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { discussionId, commentBody }, context) => {
      if (context.user) {
        const updatedDiscussion = await Discussion.findOneAndUpdate(
          { _id: discussionId },
          { $push: { comments: { commentBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedDiscussion;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { discussionId, commentId }, context) => {
      if (context.user) {
        const updateDiscussion = await Discussion.findOneAndUpdate(
          { _id: discussionId },
          { $pull: { comments: { _id: commentId } } },
          { new: true }
        );

        return updateDiscussion;
      }

      throw new AuthenticationError('You need to be logged in!');
=======
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        // ADD CATEGORIES
        addDiscussion: async (parent, args, context) => {
            if (context.user) {
                const discussion = await Discussion.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { discussions: discussion.discussionId } },
                    { new: true }
                );

                return discussion;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeDiscussion: async (parent, {discussionId}, context) => {
            console.log(discussionId);
            console.log(context.user);
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { discussions: { discussionId } } },
                    { new: true }
                );
            console.log(updateUser);
            const deleteDiscussion = await Discussion.deleteOne({_id: discussionId});
                return updateUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { discussionId, commentBody }, context) => {
            if (context.user) {
                const updatedDiscussion = await Discussion.findOneAndUpdate(
                    { _id: discussionId },
                    { $push: { comments: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedDiscussion;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async (parent, { discussionId, commentId }, context) => {
            if (context.user) {
                const updateDiscussion = await Discussion.findOneAndUpdate(
                    { _id: discussionId },
                    { $pull: { comments: { _id: commentId } } },
                    { new: true }
                );

                return updateDiscussion;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
>>>>>>> 876ae39a466b634e2785ce31e6c4421273d3e9b5
    }
};

module.exports = resolvers;
