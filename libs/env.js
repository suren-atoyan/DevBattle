class Env {
  constructor() {

    const { NODE_ENV, PORT } = process.env;

    this.env = NODE_ENV;
    this.port = PORT;
  }

  isDev() {
    return this.env === 'development';
  }

  isProd() {
    return this.env === 'production';
  }

  getPort() {
    return this.port;
  }
}

module.exports = new Env();
