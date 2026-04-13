const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validation = require('../middleware/validate'); // Required for Rubric #3

// GET all users
router.get('/', usersController.getAll);

// GET a single user by ID
router.get('/:id', usersController.getSingle);

// POST a new user (with validation)
router.post('/', validation.saveUser, usersController.createUser);

// PUT (update) a user by ID (with validation)
router.put('/:id', validation.saveUser, usersController.updateUser);

// DELETE a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;