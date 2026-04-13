const express = require('express');
const router = express.Router();
const tournamentsController = require('../controllers/tournaments');
const validation = require('../middleware/validate'); // We will build this next!

// GET all tournaments
router.get('/', tournamentsController.getAll);

// GET a single tournament by ID
router.get('/:id', tournamentsController.getSingle);

// POST a new tournament (with validation)
router.post('/', validation.saveTournament, tournamentsController.createTournament);

// PUT (update) a tournament by ID (with validation)
router.put('/:id', validation.saveTournament, tournamentsController.updateTournament);

// DELETE a tournament by ID
router.delete('/:id', tournamentsController.deleteTournament);

module.exports = router;