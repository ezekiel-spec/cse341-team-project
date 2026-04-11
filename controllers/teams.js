const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    // Collection changed to 'teams'
    const result = await mongodb.getDb().db().collection('teams').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTeam = async (req, res) => {
  try {
    // Updated object to match Team properties
    const team = {
      name: req.body.name,
      coach: req.body.coach,
      location: req.body.location,
      foundedYear: req.body.foundedYear,
      mascot: req.body.mascot,
      division: req.body.division
    };
    
    // Collection changed to 'teams'
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

module.exports = { getAll, createTeam };