const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

// 1. Middleware Setup
app
  .use(bodyParser.json())
  .use(session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }));

// 2. Import Passport Config
require('./config/passport');

// 3. Routes
app.use('/', require('./routes'));

// Auth Callback Route
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

// Home Route to check login status
app.get('/', (req, res) => { 
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out"); 
});

// 4. Database Initialization
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});