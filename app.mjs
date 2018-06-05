// TODO ::: It will be removed after Node 10 LTS verion.
import __getDirname from './libs/__dirname';
const __dirname = __getDirname(import.meta.url);

import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import config from './config';
import cors from 'cors';
import env from './libs/env';
import routes from './routes';
import auth from './libs/auth';
import db from './libs/db';

import connectMessage from './libs/utils';

(async _ => {
  await db.connect();

  await auth.generateAuthJson();

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  env.isDev && app.use(cors({
    credentials: true,
    origin: true,
  }));

  app.use(express.static(__dirname + '/public/'));

  app.use(express.static(__dirname + '/public/hackathon/build'));

  routes(app);

  const server = http.createServer(app);

  server.listen(env.port || config.get('port'), connectMessage);
})();
