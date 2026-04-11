const express = require('express');
const router = express.Router();
const tournamentsController = require('../controllers/tournaments');

router.get('/', tournamentsController.getAll);
router.post('/', tournamentsController.createTournament);

module.exports = router;