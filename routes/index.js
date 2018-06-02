module.exports = function(app) {

  app.use('/', require('./main'));

  // API
  app.use('/api/v1.0.0/', require('./api'));
}
