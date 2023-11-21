const models = require("../models");
const db = require("../config/connection");

//This will go through all of the listCollections from the mongoose database and drop them so that I can recreate
//which will clean the database
module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
