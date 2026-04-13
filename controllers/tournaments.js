const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('tournaments').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const tournamentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('tournaments').find({ _id: tournamentId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (Create)
const createTournament = async (req, res) => {
  try {
    const tournament = {
      name: req.body.name,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      prizePool: req.body.prizePool,
      gameType: req.body.gameType
    };
    const response = await mongodb.getDb().db().collection('tournaments').insertOne(tournament);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while creating the tournament.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (Update)
const updateTournament = async (req, res) => {
  try {
    const tournamentId = new ObjectId(req.params.id);
    const tournament = {
      name: req.body.name,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      prizePool: req.body.prizePool,
      gameType: req.body.gameType
    };
    const response = await mongodb.getDb().db().collection('tournaments').replaceOne({ _id: tournamentId }, tournament);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the tournament.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteTournament = async (req, res) => {
  try {
    const tournamentId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('tournaments').deleteOne({ _id: tournamentId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json('Some error occurred while deleting the tournament.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createTournament, 
  updateTournament, 
  deleteTournament 
};