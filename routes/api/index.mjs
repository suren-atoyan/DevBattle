import express from 'express';

import login from './login';
import logout from './logout';
import checkToken from './check-token';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check_token', checkToken);

router.use('/', (req, res) => res.send({}));

export default router;
