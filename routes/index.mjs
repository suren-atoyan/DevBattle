import exclude from '../middlewares/exclude-express-route';
import config from '../config';

import checkTocken from '../middlewares/check-token';
import api from './api';
import main from './main';

export default app => {

  // API;

  app.use(
    '/api/v1.0.0/',
    exclude(config.get('exclude_from_auth'), checkTocken),
    api,
  );

  // TODO ::: Check is it necessary to exlude /api?
  app.use('/', exclude(['/api'], main));
}
