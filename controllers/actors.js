const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('actors').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createActor = async (req, res) => {
  try {
    const actor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      mostFamousRole: req.body.mostFamousRole
    };
    const response = await mongodb.getDb().db().collection('actors').insertOne(actor);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Error occurred while creating the actor.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, createActor };