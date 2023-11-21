const typeDefs = `
    type User {
        _id: ID
        username: String!
        password: String!
        posts: [Post]
    }

    type Post {
        _id: ID
        title: String!
        description: String!
        url: String!
        created: String!
        user: User
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getSingleUser(userId: ID!): User
        getPosts: [Post]
        getSinglePost(postId: ID!): Post
    }

    type Mutation {
        addUser(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addPostToUser(userId: String!, title: String!, description: String!, url: String!, created: String!): Post
    }
`;

module.exports = typeDefs;
