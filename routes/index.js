module.exports = function(app) {

  // TODO ::: Create route for 404 pages

  app.use('/', require('./main'));
  app.use('/test', require('./test'));
}
