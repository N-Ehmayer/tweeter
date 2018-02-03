"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const MongoClient = require("mongodb").MongoClient;
const MONGO_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




MongoClient.connect(MONGO_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGO_URI}`);
    throw err;
  }

  //--- Initial database 'tweeter' connected ---
  console.log(`Connected to mongodb: ${MONGO_URI}`);


  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);


  app.use("/tweets", tweetsRoutes);


  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});