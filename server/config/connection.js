const mongoose = require("mongoose");

//Connecting to mongoose database and create PetPictures
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PetPictures"
);

module.exports = mongoose.connection;
