module.exports = function(app) {

  // API
  app.use('/api/v1.0.0/', require('./api'));

  app.use('/', require('./main'));
}
