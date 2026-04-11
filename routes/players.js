const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');

router.get('/', playersController.getAll);
router.post('/', playersController.createPlayer);

module.exports = router;