const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');

router.get('/', actorsController.getAll);
router.post('/', actorsController.createActor);

module.exports = router;