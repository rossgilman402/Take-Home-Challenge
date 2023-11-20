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
    addPostToUser: async (_, { title, description, url, created }, context) => {
      try {
        //Create the Post then add to user
        const newPost = await Post.create({
          title,
          description,
          url,
          created,
          user: context.user_id,
        });
        console.log(newPost);

        const user = await User.findOne({ _id: context.user._id });
        user.posts.push(newPost._id);
        await user.save();
        console.log(user);

        return newPost;
      } catch (Error) {
        console.log(Error);
      }
    },
    // addPostToUser(title: String!, description: String!, url: String!, created: String!): Post
  },
};

module.exports = resolvers;
