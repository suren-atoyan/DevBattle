import uws from 'uws';
import config from '../config';

const { port, action_types: { BROADCAST } } = config.get('uws_server');

const WebSocketServer = uws.Server;

const wss = new WebSocketServer({ port });

process.on('message', ({ actionType, data }) => {

  switch(actionType) {
    case BROADCAST:
        // Broadcast logic should be here ...
      break;
    default:
      break;
  }

});
