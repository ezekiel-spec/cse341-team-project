const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const lists = await mongodb.getDb().db().collection('players').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const playerId = new ObjectId(req.params.id);
    const lists = await mongodb.getDb().db().collection('players').find({ _id: playerId }).toArray();
    
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (Create)
const createPlayer = async (req, res) => {
  try {
    const player = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      teamId: req.body.teamId,
      jerseyNumber: req.body.jerseyNumber,
      height: req.body.height,
      weight: req.body.weight
    };
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

// PUT (Update)
const updatePlayer = async (req, res) => {
  try {
    const playerId = new ObjectId(req.params.id);
    const player = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      teamId: req.body.teamId,
      jerseyNumber: req.body.jerseyNumber,
      height: req.body.height,
      weight: req.body.weight
    };
    const response = await mongodb.getDb().db().collection('players').replaceOne({ _id: playerId }, player);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the player.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deletePlayer = async (req, res) => {
  try {
    const playerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('players').deleteOne({ _id: playerId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json('Some error occurred while deleting the player.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createPlayer, 
  updatePlayer, 
  deletePlayer 
};