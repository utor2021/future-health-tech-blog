import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DISCUSSION = gql`
  mutation addDiscussion($ideaText: String!,$topicTitle: String!) {
    addDiscussion(ideaText: $ideaText, topicTitle: $topicTitle) {
      _id
      topicTitle
      ideaText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const REMOVE_DISCUSSION = gql`
  mutation removeDiscussion($discussionId: ID!) {
    removeDiscussion(discussionId: $discussionId) {
    _id
    username
    email
    discussions {
      _id
      topicTitle
      ideaText
      createdAt
      username
    }
    }
  }
`;




export const ADD_COMMENT = gql`
  mutation addComment($discussionId: ID!, $commentBody: String!) {
    addComment(discussionId: $discussionId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;
