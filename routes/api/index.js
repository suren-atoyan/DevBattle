const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const auth = require('../../libs/auth');

// TODO ::: Please move getting auth.json functionality to libs/genAuth.js file 
const AUTH_JSON_PATH = path.join(__dirname, '../../config/', config.get('auth_path'));

router.post('/login', (req, res) => {
  const { pass: reqPass } = req.body;

  // TODO ::: Use async/await and fs.exist after migrating to NodeJs 10 version
  const authObj = fs.existsSync(AUTH_JSON_PATH)
    ? JSON.parse(fs.readFileSync(AUTH_JSON_PATH, 'utf-8'))
    : {};

  const { password } = authObj;

  if (reqPass && reqPass === password) {
    const token = auth.sign(password);
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
    res.send({ isAdmin: true });
  } else {
    res.status(401).send({ message: 'Authentication failed.' });
  }
});

router.post('/logout', (req, res) => {
  const { token } = req.cookies;
  auth.unsign(token);

  res.send({});
});

router.get('/check_token', (req, res) => {
  const { token } = req.cookies;
  const decoded = auth.verify(token);
  res.send({
    isAdmin: !!decoded,
  });
});

router.use('/', (req, res) => {
  res.send({});
});

module.exports = router;
