const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');
const validation = require('../middleware/validate');

// GET all teams
router.get('/', teamsController.getAll);

// GET a single team by ID
router.get('/:id', teamsController.getSingle);

// POST a new team (with validation)
router.post('/', validation.saveTeam, teamsController.createTeam);

// PUT (update) a team by ID (with validation)
router.put('/:id', validation.saveTeam, teamsController.updateTeam);

// DELETE a team by ID
router.delete('/:id', teamsController.deleteTeam);

module.exports = router;