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
    deletePost: async (_, { postId }) => {
      try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
          throw new Error("Post not found");
        }

        return deletedPost;
      } catch (error) {
        throw new Error(`Error deleting post: ${error}`);
      }
    },
    editPost: async (_, { postId, title, description, url }) => {
      try {
        // Assume your Post model has a method to find and update a post by ID
        const editedPost = await Post.findByIdAndUpdate(
          postId,
          { title, description, url },
          { new: true, runValidators: true }
        );

        if (!editedPost) {
          throw new Error("Post not found");
        }

        return editedPost;
      } catch (error) {
        throw new Error(`Error editing post: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
