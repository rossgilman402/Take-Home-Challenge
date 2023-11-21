const mongoose = require("mongoose");

//PostSchema is based on the fetched data given
//Create mongooseModel that will connect to user because a user will have many posts
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
