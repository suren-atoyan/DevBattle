import uws from 'uws';
import config from '../config';

const { port, action_types: { BROADCAST } } = config.get('uws_server');

const WebSocketServer = uws.Server;

const wss = new WebSocketServer({ port });

wss.broadcast = data => wss.clients.forEach(client => client.send(JSON.stringify(data)));

process.on('message', ({ actionType, payload }) => {

  switch(actionType) {
    case BROADCAST:
        wss.broadcast(payload);
      break;
    default:
      break;
  }
});
