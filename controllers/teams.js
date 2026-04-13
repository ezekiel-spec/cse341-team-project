const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('teams').find();
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
    const teamId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('teams').find({ _id: teamId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (Create)
const createTeam = async (req, res) => {
  try {
    const team = {
      name: req.body.name,
      coach: req.body.coach,
      location: req.body.location,
      foundedYear: req.body.foundedYear,
      mascot: req.body.mascot,
      division: req.body.division
    };
    const response = await mongodb.getDb().db().collection('teams').insertOne(team);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while creating the team.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (Update)
const updateTeam = async (req, res) => {
  try {
    const teamId = new ObjectId(req.params.id);
    const team = {
      name: req.body.name,
      coach: req.body.coach,
      location: req.body.location,
      foundedYear: req.body.foundedYear,
      mascot: req.body.mascot,
      division: req.body.division
    };
    const response = await mongodb.getDb().db().collection('teams').replaceOne({ _id: teamId }, team);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the team.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteTeam = async (req, res) => {
  try {
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('teams').deleteOne({ _id: teamId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json('Some error occurred while deleting the team.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createTeam, 
  updateTeam, 
  deleteTeam 
};