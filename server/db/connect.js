require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

let _db;

const initDatabase = async (callback) => {
  if (_db) {
    console.log("initDatabase called");
    callback(_db, null);
  }
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      _db = client;
      console.log("connected to database");
      callback(_db, null);
    })
    .catch((err) => {
      console.log(err);
      callback(null, err);
    });
};

const getDb = () => {
  return _db;
};

module.exports = {
  initDatabase,
  getDb,
};
