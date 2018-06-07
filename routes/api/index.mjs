import express from 'express';

import login from './login';
import logout from './logout';
import checkToken from './check-token';
import { createHackathon, getHackathon } from './hackathon';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/hackathons', createHackathon);
router.get('/hackathons', getHackathon);

router.get('/check_token', checkToken);

router.use('/', (req, res) => res.send({}));

export default router;