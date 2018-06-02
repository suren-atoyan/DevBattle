const path = require('path');

const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/hackathon/build/index.html'));
});

module.exports = router;
