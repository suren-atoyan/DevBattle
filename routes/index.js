module.exports = function(app) {

  // TODO ::: Create route for 404 pages

  app.use('/', require('./main'));

  // API
  app.use('/api/v1.0.0/', require('./api'));
}
