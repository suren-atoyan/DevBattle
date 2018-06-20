import uWsServer from './';
import config from '../config';

const { action_types: { BROADCAST } } = config.get('uws_server');

const broadcast = (type, payload) => uWsServer.send({
  actionType: BROADCAST,
  data: {
    type,
    payload,
  },
});

export { broadcast };
