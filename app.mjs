// TODO ::: It will be removed after Node 10 LTS verion release.
import __getDirname from './libs/__dirname';
const __dirname = __getDirname(import.meta.url);

import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';

import config from './config';
import cors from 'cors';
import env from './libs/env';
import routes from './routes';
import auth from './libs/auth';
import db from './db';
import errorHandler from './errorHandler';

import { connectMessage } from './libs/utils';

import './ws'; // Initialize uws websocket server in a child process.

(async _ => {
  await db.config(config.get('db')).connect();

  await auth.run();

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  env.isDev && (
    app.use(cors({ credentials: true, origin: true, })),
    app.use(morgan('combined')),
    process.on('uncaughtException', console.error)
  );

  app.use(express.static(__dirname + '/public/'));

  app.use(express.static(__dirname + '/public/dev-battle/build'));

  routes(app);

  app.use(errorHandler);

  const server = http.createServer(app);

  server.listen(env.port || config.get('port'), connectMessage);
})();
