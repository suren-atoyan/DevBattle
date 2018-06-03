const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const SECRET = require('../config/.secret.json');

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

module.exports = new Auth();
