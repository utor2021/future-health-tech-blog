import gql from 'graphql-tag';

export const QUERY_DISCUSSIONS = gql`
  query discussionsall($username: String) {
    discussionsall(username: $username) {
      _id
      topicTitle
      ideaText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    } 
  }
`;

export const QUERY_DISCUSSIONS_TITLE = gql`
  query discussions($topicTitle: String!) {
    discussions(topicTitle: $topicTitle) {
      _id
      topicTitle
      ideaText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_DISCUSSION = gql`
  query discussion($id: ID!) {
    discussion(_id: $id) {
      _id
      topicTitle
      ideaText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email     
      discussions {
        _id
        topicTitle
        ideaText
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email      
      discussions {
        _id
        topicTitle
        ideaText
        createdAt
        commentCount        
      }      
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email     
    }
  }
`;
