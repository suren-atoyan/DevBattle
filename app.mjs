// TODO ::: It will be removed after Node 10 LTS verion.
import __getDirname from './libs/__dirname';
const __dirname = __getDirname(import.meta.url);

import http from 'http';
import figlet from 'figlet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import config from './config';
import cors from 'cors';
import env from './libs/env';
import genAuth from './libs/genAuth';

genAuth.run();

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

import routes from './routes';

routes(app);

const server = http.createServer(app);

server.listen(env.port || config.get('port'), _ => {
  figlet.text('connect', (err, data) => {
    if (err) return console.error(err); // TODO ::: Create ErrorHandler
      console.log(data);
    })
});
