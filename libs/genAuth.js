const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const env = require('./env');

const AUTH_JSON_PATH = path.join(__dirname, '../config/', config.get('auth_path'));
const ADMIN_PASS_LENGTH = config.get('admin_pass_length');

class GenAuth {

  run() {
    this.generate(AUTH_JSON_PATH, env.args.withNewPassword);
  }

  generate(authJsonPath, withNewPassword) {
    const authObj = this.existsAuthJson(authJsonPath)
      ? JSON.parse(fs.readFileSync(authJsonPath, 'utf-8'))
      : {};

    if (
      withNewPassword ||
      (!authObj.password || authObj.password.length !== ADMIN_PASS_LENGTH)
    ) {
      this.reWritePassword(authJsonPath, authObj);
    }
  }

  reWritePassword(authJsonPath, authObj) {
    authObj.password = this.genRandomCryptoString(ADMIN_PASS_LENGTH);
    fs.writeFileSync(authJsonPath, JSON.stringify(authObj));
  }

  existsAuthJson(authJsonPath) {
    return fs.existsSync(authJsonPath);
  }

  genRandomCryptoString(len) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  }

}

module.exports = new GenAuth();
