const faker = require('faker');

const db = require('../config/connection');
const { Discussion, User } = require('../models');

db.once('open', async () => {
    await Discussion.deleteMany({});
    await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  //for (let i = 0; i < 100; i += 1) {
  //  const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //  const { _id: userId } = createdUsers.ops[randomUserIndex];

  //  let friendId = userId;

  //  while (friendId === userId) {
  //    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //    friendId = createdUsers.ops[randomUserIndex];
  //  }

  //  await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  //}

  // create discussions
    let createdDiscussions = [];
  for (let i = 0; i < 100; i += 1) {
      const ideaText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
      const categories = ['Artificial Intelligence', 'Virtual Reality', 'Self-knowledge', 'mHealth', 'Other'];
      const topicTitle = categories[Math.round(Math.random() * 4)];

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

      const createdDiscussion = await Discussion.create({ topicTitle, ideaText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
        { $push: { discussion: createdDiscussion._id } }
    );

      createdDiscussions.push(createdDiscussion);
  }

  // create comments
  for (let i = 0; i < 100; i += 1) {
      const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

      const randomDiscussionIndex = Math.floor(Math.random() * createdDiscussions.length);
      const { _id: discussionId } = createdDiscussions[randomDiscussionIndex];

      await Discussion.updateOne(
          { _id: discussionId },
          { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
