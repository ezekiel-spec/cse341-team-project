const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');

// GET all teams
router.get('/', teamsController.getAll);

// POST a new team - changed from createActor to createTeam
router.post('/', teamsController.createTeam);

module.exports = router;