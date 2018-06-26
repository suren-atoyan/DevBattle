import express from 'express';
import { handleInvalidRequest } from '../../libs/utils';

import shouldBeAdmin from '../../middlewares/should-be-admin';

import login from './login';
import logout from './logout';
import checkToken from './check-token';
import { createTeam, deleteTeam } from './team';
import { getResults } from './results';
import {
  createHackathon,
  getHackathon,
  startHackathon,
  finishHackathon,
  deleteHackathon,
} from './hackathons/';
import { changePassword } from './admin';
import challengeAnswer from './challenge-answer';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/hackathons', getHackathon);
router.post('/hackathons', shouldBeAdmin, createHackathon);
router.post('/hackathons/start', shouldBeAdmin, startHackathon);
router.post('/hackathons/finish', shouldBeAdmin, finishHackathon);
router.delete('/hackathons', shouldBeAdmin, deleteHackathon);
router.put('/admin', shouldBeAdmin, changePassword);
router.post('/challenge_answer', challengeAnswer);
router.post('/team', createTeam);
router.delete('/team/:id', shouldBeAdmin, deleteTeam);
router.get('/results', getResults);

router.get('/check_token', checkToken);

router.use('/', (req, res) => handleInvalidRequest(res, 404));

export default router;
