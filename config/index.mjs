import path  from 'path';
import nconf from 'nconf';
import env from '../libs/env';

// TODO ::: It will be removed after Node 10 LTS verion release.
import __getDirname from '../libs/__dirname';
const __dirname = __getDirname(import.meta.url);

nconf
  .argv()
  .env()
  .file({
    file: path.join(__dirname, `config${env.isProd ? '.prod' : ''}.json`),
  });

export default nconf;
