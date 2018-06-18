import express from 'express';

import login from './login';
import logout from './logout';
import checkToken from './check-token';
import { createTeam } from './team';
import {
  createHackathon,
  getHackathon,
  startHackathon,
  finishHackathon,
} from './hackathons/';
import challengeAnswer from './challenge-answer';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/hackathons', getHackathon);
router.post('/hackathons', createHackathon);
router.post('/hackathons/start', startHackathon);
router.post('/hackathons/finish', finishHackathon);
router.post('/challenge_answer', challengeAnswer);
router.post('/team', createTeam);

router.get('/check_token', checkToken);

router.use('/', (req, res) => res.send({}));

export default router;
