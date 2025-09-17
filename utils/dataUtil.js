
const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

 const MONGO_URL = "mongodb://127.0.0.1:27017/NotesApp";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
  .then(client => {
    console.log('Connected to MongoDB');
    _db = client.db();
    callback();
  }).catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
}

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;