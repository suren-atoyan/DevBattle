import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import config from '../config';
import SECRET from '../config/.secret.json';

// TODO ::: It will be removed after Node 10 LTS verion.
import __getDirname from './__dirname';
const __dirname = __getDirname(import.meta.url);

const AUTH_JSON_PATH = path.join(__dirname, '../config/', config.get('auth_path'));

// TODO ::: Fix getting auth.json

class Auth {

  constructor() {
    this.authObj = fs.existsSync(AUTH_JSON_PATH)
      ? JSON.parse(fs.readFileSync(AUTH_JSON_PATH, 'utf-8')): {};

    !this.authObj.activeTokens && (this.authObj.activeTokens = []);
  }

  sign(pass) {
    // TODO ::: Change expiration time
    const token = jwt.sign({ pass: pass, isAdmin: true }, SECRET, { expiresIn: '1h' });
    if (!this.authObj.activeTokens.includes(token)) {
      this.authObj.activeTokens.push(token);
      this.updateActiveTokens();
    }

    return token;
  }

  verify(token) {
    if (this.authObj.activeTokens.includes(token)) {
      
      try {
        return jwt.verify(token, SECRET);
      } catch(err) {
        this.unsign(token);
        return;
      }

    }

    return;
  }

  unsign(token) {
    this.authObj.activeTokens = this.authObj.activeTokens
          .filter(activeToken => activeToken !== token);
    this.updateActiveTokens();
  }

  updateActiveTokens() {
    fs.writeFileSync(AUTH_JSON_PATH, JSON.stringify(this.authObj));
  }
}

export default new Auth();
