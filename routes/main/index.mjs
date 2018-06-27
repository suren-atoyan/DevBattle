import path from 'path';

import express from 'express';
const router = express.Router();

// TODO ::: It will be removed after Node 10 LTS verion release.
import __getDirname from '../../libs/__dirname';
const __dirname = __getDirname(import.meta.url);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/dev-battle/build/index.html'));
});

export default router;
