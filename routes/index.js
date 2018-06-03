const exclude = require('../middlewares/exclude-express-route');
const config  = require('../config');

module.exports = function(app) {

  // API;

  app.use(
    '/api/v1.0.0/',
    exclude(config.get('exclude_from_auth'), require('../middlewares/check-token')),
    require('./api')
  );

  // TODO ::: Check is it necessary to exlude /api?
  app.use('/', exclude('/api', require('./main')));
}
