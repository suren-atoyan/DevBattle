import crypto from 'crypto';
import fs from './promisify-fs';
import path from 'path';
import config from '../config';
import env from './env';

// TODO ::: It will be removed after Node 10 LTS verion.
import __getDirname from './__dirname';
const __dirname = __getDirname(import.meta.url);

const AUTH_JSON_PATH = path.join(__dirname, '../config/', config.get('auth_path'));
const ADMIN_PASS_LENGTH = config.get('admin_pass_length');

class GenAuth {

  async run() {
    return this.generate(AUTH_JSON_PATH, env.args.withNewPassword);
  }

  async generate(authJsonPath, withNewPassword) {
    const existsAuthJson = await this.existsAuthJson(authJsonPath);
    const authObj = existsAuthJson
      ? JSON.parse(await fs.readFile(authJsonPath, 'utf8'))
      : {};

    if (
      withNewPassword ||
      (!authObj.password || authObj.password.length !== ADMIN_PASS_LENGTH)
    ) {
      return this.reWritePassword(authJsonPath, authObj);
    }
  }

  async reWritePassword(authJsonPath, authObj) {
    authObj.password = this.genRandomCryptoString(ADMIN_PASS_LENGTH);
    return fs.writeFile(authJsonPath, JSON.stringify(authObj));
  }

  async existsAuthJson(authJsonPath) {
    return fs.stat(authJsonPath);
  }

  genRandomCryptoString(len) {
    // TODO ::: Replace crypto to tls.createSecureContext
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  }

}

export default new GenAuth();
