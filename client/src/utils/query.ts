import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      created
      description
      title
      url
      user {
        username
      }
    }
  }
`;

export const GET_USER_DATA = gql`
  query GetSingleUser($userId: ID!) {
    getSingleUser(userId: $userId) {
      username
      posts {
        _id
        created
        description
        title
        url
      }
    }
  }
`;

export const GET_ONE_POST = gql`
  query GetSinglePost($postId: ID!) {
    getSinglePost(postId: $postId) {
      _id
      created
      description
      title
      url
    }
  }
`;
