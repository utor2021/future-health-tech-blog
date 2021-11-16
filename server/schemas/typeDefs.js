const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    discussions: [Discussion]
  }

  type Discussion {
    _id: ID
    topicTitle: String
    ideaText: String
    createdAt: String
    username: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    discussions(username: String): [Discussion]
    discussion(_id: ID!): Discussion
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addDiscussion(topicTitle: String!, ideaText: String!): Discussion
    addComment(discussionId: ID!, commentBody: String!): Discussion
  }
`;

module.exports = typeDefs;
