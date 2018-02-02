"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGO_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGO_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGO_URI}`);
    throw err;
  }

  //--- Initial database 'tweeter' connected ---
  console.log(`Connected to mongodb: ${MONGO_URI}`);


  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback)
  }


  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

});