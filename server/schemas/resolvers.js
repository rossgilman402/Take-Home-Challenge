const { User, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth.js");

const resolvers = {
  Query: {
    getSingleUser: async (_, { userId }) => {
      return User.findOne({ _id: userId }).populate("posts");
    },
    getPosts: async () => {
      return Post.find({});
    },
  },
  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
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
  },
};

module.exports = resolvers;
