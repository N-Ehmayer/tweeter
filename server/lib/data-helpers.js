"use strict";



// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err) => {
        callback(err);
      });

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {

      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) throw err;

        const sortNewestFirst = (a, b) => {
          return a.created_at - b.created_at;
        }

        callback(null, tweets.sort(sortNewestFirst));
      });
    }
  }
};
