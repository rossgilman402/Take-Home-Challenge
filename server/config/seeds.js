const db = require("./connection");
const { User, Post } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("User", "users");
  await cleanDB("Post", "posts");

  try {
    const user = await User.create({
      username: "anonymous",
      password: "password123",
    });
    console.log(user);

    const response = await fetch("https://eulerity-hackathon.appspot.com/pets");
    const petData = await response.json();

    for (const pet of petData) {
      const newPost = await Post.create({
        title: pet.title,
        description: pet.description,
        url: pet.url,
        created: pet.created,
        user: user._id,
      });
      user.posts.push(newPost._id);
      await user.save();
    }
    console.log(user);

    console.log("Completed Seeds!");
    process.exit(0);
  } catch (Error) {
    console.log(Error);
  }
});
