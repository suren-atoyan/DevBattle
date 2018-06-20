import { fork } from 'child_process';
import path from 'path';
import config from '../config';

// TODO ::: It will be removed after Node 10 LTS verion.
import __getDirname from '../libs/__dirname';
const __dirname = __getDirname(import.meta.url);

const uwsServerPath = path.resolve(__dirname, './uws-server.mjs');

const parameters = config.get('uws_server').child_process_parameters;
const options = {
  stdio: [0, 1, 2, 'ipc'], // "0, 1, 2" -> mean "process.stdin, process.stdout, process.stderr"
  // And 'ipc' for creating an Inter Process Communication (IPC) channel
  // for passing messages/file descriptors between parent and child.
};

const uwsServer = fork(uwsServerPath, parameters, options);

export default uwsServer;
