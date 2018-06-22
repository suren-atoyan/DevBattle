import uws from 'uws';
import config from '../config';

const { port, action_types: { BROADCAST } } = config.get('uws_server');

const WebSocketServer = uws.Server;

const wss = new WebSocketServer({ port });

// TODO ::: We shouldn't send message to that user whos action triggered broadcast
// For avoiding redundant store update in client
wss.broadcast = data => wss.clients.forEach(client => client.send(JSON.stringify(data)));

process.on('message', ({ actionType, data }) => {

  switch(actionType) {
    case BROADCAST:
        wss.broadcast(data);
      break;
    default:
      break;
  }
});
