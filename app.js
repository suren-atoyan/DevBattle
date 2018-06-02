const http = require('http');
const figlet = require('figlet');
const bodyParser = require('body-parser');
const config = require('./config');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const env = require('./libs/env');
const genAuth = require('./libs/genAuth');

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

require('./routes')(app);

const server = http.createServer(app);

server.listen(env.port || config.get('port'), _ => {
  figlet.text('connect', (err, data) => {
    if (err) return console.error(err); // TODO ::: Create ErrorHandler
      console.log(data);
    })
});
