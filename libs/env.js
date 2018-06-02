class Env {
  constructor() {

    const { NODE_ENV, PORT } = process.env;

    this.env = NODE_ENV;

    this.port = PORT;

    this.isDev = this.env === 'development';

    this.isProd = this.env === 'production';

    this.isTest = this.env === 'test';

    this.args = this.getArgs();
  }

  getArgs() {
    let args = process.argv.slice(2);

    args = args.filter(item => item.startsWith('--'));

    return args.reduce(
      (acc, item) => {
        // TODO ::: Check is necessary to replace all scpaces with nothing.
        const keyValueStr = item.replace(/ /g, '').split('=');
        const key = keyValueStr[0].slice(2);
        const value = keyValueStr[1] || true;
        acc[key] = value;
        return acc;
      },
      {},
    );
  }
}

module.exports = new Env();
