const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');
const validation = require('../middleware/validate');

// GET all players
router.get('/', playersController.getAll);

// GET a single player by ID
router.get('/:id', playersController.getSingle);

// POST a new player (with validation)
router.post('/', validation.savePlayer, playersController.createPlayer);

// PUT (update) a player by ID (with validation)
router.put('/:id', validation.savePlayer, playersController.updatePlayer);

// DELETE a player by ID
router.delete('/:id', playersController.deletePlayer);

module.exports = router;