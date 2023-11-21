const { User, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth.js");

const resolvers = {
  Query: {
    getSingleUser: async (_, { userId }) => {
      return User.findOne({ _id: userId }).populate("posts");
    },
    getPosts: async () => {
      return Post.find({}).populate("user");
    },
    getSinglePost: async (_, { postId }) => {
      return Post.findOne({ _id: postId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addPostToUser: async (_, { userId, title, description, url, created }) => {
      try {
        console.log(userId);
        const user = await User.findOne({ _id: userId });

        if (!user) {
          console.error(`User not found with ID: ${userId}`);
          throw new Error("User not found");
        }

        const newPost = await Post.create({
          title,
          description,
          url,
          created,
          user: userId,
        });

        console.log(newPost);

        user.posts.push(newPost._id);
        await user.save();
        console.log(user);

        // Return the new post with the associated user
        return newPost;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create post");
      }
    },

    // addPostToUser(title: String!, description: String!, url: String!, created: String!): Post
  },
};

module.exports = resolvers;
