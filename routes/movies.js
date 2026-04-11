const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAll);
router.post('/', moviesController.createMovie);

module.exports = router;