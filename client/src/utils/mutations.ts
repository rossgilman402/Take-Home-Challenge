import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
      }
    }
  }
`;

export const ADD_POST_TO_USER = gql`
  mutation AddPostToUser(
    $userId: String!
    $title: String!
    $description: String!
    $url: String!
    $created: String!
  ) {
    addPostToUser(
      userId: $userId
      title: $title
      description: $description
      url: $url
      created: $created
    ) {
      _id
      created
      description
      title
      url
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      created
      description
      title
      url
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost(
    $postId: ID!
    $title: String
    $description: String
    $url: String
  ) {
    editPost(
      postId: $postId
      title: $title
      description: $description
      url: $url
    ) {
      _id
      created
      description
      title
      url
    }
  }
`;
