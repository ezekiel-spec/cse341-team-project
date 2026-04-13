const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/index');

// Mocking all controllers to ensure every function the route expects is present
jest.mock('../controllers/players', () => ({
  getAll: (req, res) => res.status(200).json([]),
  getSingle: (req, res) => res.status(200).json({}),
  createPlayer: (req, res) => res.status(201).json({}),
  updatePlayer: (req, res) => res.status(204).send(),
  deletePlayer: (req, res) => res.status(200).send()
}));

jest.mock('../controllers/teams', () => ({
  getAll: (req, res) => res.status(200).json([]),
  getSingle: (req, res) => res.status(200).json({}),
  createTeam: (req, res) => res.status(201).json({}),
  updateTeam: (req, res) => res.status(204).send(),
  deleteTeam: (req, res) => res.status(200).send()
}));

jest.mock('../controllers/tournaments', () => ({
  getAll: (req, res) => res.status(200).json([]),
  getSingle: (req, res) => res.status(200).json({}),
  createTournament: (req, res) => res.status(201).json({}),
  updateTournament: (req, res) => res.status(204).send(),
  deleteTournament: (req, res) => res.status(200).send()
}));

jest.mock('../controllers/users', () => ({
  getAll: (req, res) => res.status(200).json([]),
  getSingle: (req, res) => res.status(200).json({}),
  createUser: (req, res) => res.status(201).json({}),
  updateUser: (req, res) => res.status(204).send(),
  deleteUser: (req, res) => res.status(200).send()
}));

app.use(express.json());
app.use('/', router);

describe('GET Endpoints', () => {
  it('should return status 200 for /players', async () => {
    const res = await request(app).get('/players');
    expect(res.statusCode).toEqual(200);
  });
  it('should return status 200 for /teams', async () => {
    const res = await request(app).get('/teams');
    expect(res.statusCode).toEqual(200);
  });
  it('should return status 200 for /tournaments', async () => {
    const res = await request(app).get('/tournaments');
    expect(res.statusCode).toEqual(200);
  });
  it('should return status 200 for /users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });
});