const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('users').find();
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
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (Create)
const createUser = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      bio: req.body.bio
    };
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (Update)
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      bio: req.body.bio
    };
    const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json('Some error occurred while deleting the user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createUser, 
  updateUser, 
  deleteUser 
};