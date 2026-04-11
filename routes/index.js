const express = require('express');
const router = express.Router();

// Documentation route
router.use('/', require('./swagger'));

// Collection routes
router.use('/players', require('./players'));
router.use('/teams', require('./teams'));
router.use('/tournaments', require('./tournaments'));
router.use('/users', require('./users'));

module.exports = router;