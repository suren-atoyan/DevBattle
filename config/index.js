const path  = require('path');
const nconf = require('nconf');
const env = require('../libs/env');

nconf
  .argv()
  .env()
  .file({
    file: path.join(__dirname, `config${env.isProd ? '.prod' : ''}.json`),
  });

module.exports = nconf;
