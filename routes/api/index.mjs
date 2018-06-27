import express from 'express';
import { handleInvalidRequest } from '../../libs/utils';

import shouldBeAdmin from '../../middlewares/should-be-admin';

import login from './login';
import logout from './logout';
import checkToken from './check-token';
import { createTeam, deleteTeam } from './team';
import { getResults } from './results';
import {
  createBattle,
  getBattle,
  startBattle,
  finishBattle,
  deleteBattle,
} from './battles/';
import { changePassword } from './admin';
import challengeAnswer from './challenge-answer';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/battles', getBattle);
router.post('/battles', shouldBeAdmin, createBattle);
router.post('/battles/start', shouldBeAdmin, startBattle);
router.post('/battles/finish', shouldBeAdmin, finishBattle);
router.delete('/battles', shouldBeAdmin, deleteBattle);
router.put('/admin', shouldBeAdmin, changePassword);
router.post('/challenge_answer', challengeAnswer);
router.post('/team', createTeam);
router.delete('/team/:id', shouldBeAdmin, deleteTeam);
router.get('/results', getResults);

router.get('/check_token', checkToken);

router.use('/', (req, res) => handleInvalidRequest(res, 404));

export default router;
