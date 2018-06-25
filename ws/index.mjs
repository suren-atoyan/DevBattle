import { fork } from 'child_process';
import path from 'path';
import config from '../config';

// TODO ::: It will be removed after Node 10 LTS verion release.
import __getDirname from '../libs/__dirname';
const __dirname = __getDirname(import.meta.url);

const uwsServerPath = path.resolve(__dirname, './uws-server.mjs');

const parameters = config.get('uws_server').child_process_parameters;
const options = {
  stdio: [0, 1, 'pipe', 'ipc'], // "0, 1, 2" -> mean "process.stdin, process.stdout, process.stderr"
  // And 'ipc' for creating an Inter Process Communication (IPC) channel
  // for passing messages/file descriptors between parent and child.
};

const uwsServer = fork(uwsServerPath, parameters, options);

uwsServer.stderr.on('data', errorBuffer => {
  const error = new Error(errorBuffer);

  // Handle uWs server errors here.
  // TODO ::: Check all types of errors
  // And do proper actions depending on error type
  // Implement uws process re-spawn
});

export default uwsServer;
