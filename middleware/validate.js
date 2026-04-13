const validator = require('./validator-base');

const saveTournament = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    location: 'required|string',
    startDate: 'required|string',
    endDate: 'required|string',
    prizePool: 'required|string',
    gameType: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    email: 'required|string|email',
    password: 'required|string|min:6',
    role: 'required|string',
    bio: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const savePlayer = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    position: 'required|string',
    teamId: 'required|string',
    jerseyNumber: 'required|integer',
    height: 'string',
    weight: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTeam = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    coach: 'required|string',
    location: 'required|string',
    foundedYear: 'required|integer',
    mascot: 'string',
    division: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTournament,
  saveUser,
  savePlayer,
  saveTeam
};