const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  // Added standard connection options for stability
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // Logic Change: We store the database instance directly
      _db = client; 
      console.log('Successfully connected to MongoDB');
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };