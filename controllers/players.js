const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    // Updated collection name to 'players'
    const result = await mongodb.getDb().db().collection('players').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPlayer = async (req, res) => {
  try {
    // Updated object to match Player properties
    const player = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      teamId: req.body.teamId,
      jerseyNumber: req.body.jerseyNumber,
      height: req.body.height,
      weight: req.body.weight
    };
    
    // Updated collection name to 'players'
    const response = await mongodb.getDb().db().collection('players').insertOne(player);
    
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while creating the player.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, createPlayer };