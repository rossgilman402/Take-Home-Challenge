const db = require("./connection");
const { User, Post } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  //Run the cleanDB script on the user and post models
  await cleanDB("User", "users");
  await cleanDB("Post", "posts");

  try {
    //Create a random user for the fetched data that was given
    const user = await User.create({
      username: "anonymous",
      password: "password123",
    });
    console.log(user);

    //Fetch the data that was given
    const response = await fetch("https://eulerity-hackathon.appspot.com/pets");
    const petData = await response.json();

    //Loop through the petData and create a post from it then add it to the user
    //User will have many posts
    for (const pet of petData) {
      const newPost = await Post.create({
        title: pet.title,
        description: pet.description,
        url: pet.url,
        created: pet.created,
        user: user._id,
      });
      //User.save() to update the list of user posts by it's ID
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
