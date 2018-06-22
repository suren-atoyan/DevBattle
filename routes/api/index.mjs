import express from 'express';

import shouldBeAdmin from '../../middlewares/should-be-admin';

import login from './login';
import logout from './logout';
import checkToken from './check-token';
import { createTeam } from './team';
import { getResults } from './results';
import {
  createHackathon,
  getHackathon,
  startHackathon,
  finishHackathon,
  deleteHackathon,
} from './hackathons/';
import challengeAnswer from './challenge-answer';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/hackathons', getHackathon);
router.post('/hackathons', shouldBeAdmin, createHackathon);
router.post('/hackathons/start', shouldBeAdmin, startHackathon);
router.post('/hackathons/finish', shouldBeAdmin, finishHackathon);
router.delete('/hackathons', shouldBeAdmin, deleteHackathon);
router.post('/challenge_answer', challengeAnswer);
router.post('/team', createTeam);
router.get('/results', getResults);

router.get('/check_token', checkToken);

router.use('/', (req, res) => res.status(404).send({
  errorMessage: 'Oops! You tried to get something that does not exist in this universe.',
}));

export default router;
