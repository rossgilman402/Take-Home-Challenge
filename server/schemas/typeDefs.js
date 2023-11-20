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
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getSingleUser(userId: ID!): User
        getPosts: [Post]
    }

    type Mutation {
        addUser(username: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
