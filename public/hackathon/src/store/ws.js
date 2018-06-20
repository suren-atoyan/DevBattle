import WebSocket from 'reconnectingwebsocket';
import { url } from 'config';

export default new WebSocket(url.ws);
