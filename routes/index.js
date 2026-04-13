const express = require('express');
const router = express.Router();
const passport = require('passport');

// Documentation route
router.use('/', require('./swagger'));

// Auth Routes
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Collection routes
router.use('/players', require('./players'));
router.use('/teams', require('./teams'));
router.use('/tournaments', require('./tournaments'));
router.use('/users', require('./users'));

module.exports = router;