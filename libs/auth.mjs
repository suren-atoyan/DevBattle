import crypto from 'crypto';
import fs from './promisify-fs';
import path from 'path';
import config from '../config';
import env from './env';
import jwt from 'jsonwebtoken';
import db from './db';

// TODO ::: It will be removed after Node 10 LTS verion.
import __getDirname from './__dirname';
const __dirname = __getDirname(import.meta.url);

const AUTH_JSON_PATH = path.join(__dirname, '../config/', config.get('auth_path'));
const ADMIN_PASS_LENGTH = config.get('admin_pass_length');

class Auth {

  static genRandomCryptoString(len) {
    // TODO ::: Replace crypto to tls.createSecureContext
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  }

  static async reWritePassword(authJsonPath, authObj, adminPassLength) {
    authObj.password = Auth.genRandomCryptoString(adminPassLength);
    return Auth.saveAuthJson(authJsonPath, authObj);
  }

  static async existsAuthJson(authJsonPath) {
    return fs.stat(authJsonPath);
  }

  static async saveAuthJson(authJsonPath, authObj) {
    return fs.writeFile(authJsonPath, JSON.stringify(authObj))
  }

  static async getAuthObj(authJsonPath) {
    return JSON.parse(await fs.readFile(authJsonPath, 'utf8'));
  }

  constructor({ authJsonPath, adminPassLength, withNewPassword }) {
    this.authJsonPath = authJsonPath;
    this.adminPassLength = adminPassLength;
    this.withNewPassword = withNewPassword;
  }

  async generateAuthJson() {

    const { authJsonPath, withNewPassword, adminPassLength } = this;

    const existsAuthJson = await Auth.existsAuthJson(authJsonPath);
    const authObj = existsAuthJson
      ? await Auth.getAuthObj(this.authJsonPath)
      : {};

    if (!authObj.secret) {
      authObj.secret = Auth.genRandomCryptoString(10);
    }

    this.secret = authObj.secret;

    if (
      withNewPassword ||
      (!authObj.password || authObj.password.length !== adminPassLength)
    ) {
      return Auth.reWritePassword(authJsonPath, authObj, adminPassLength);
    } else {
      return Auth.saveAuthJson(authJsonPath, authObj);
    }
  }

  async getActiveTockens() {
    const authObj = await Auth.getAuthObj(this.authJsonPath);
    return authObj.activeTokens || [];
  }

  async getPassword() {
    const authObj = await Auth.getAuthObj(this.authJsonPath);
    return authObj.password;
  }

  async updateActiveTokens(activeTokens) {
    const authObj = await Auth.getAuthObj(this.authJsonPath);
    authObj.activeTokens = activeTokens;
    Auth.saveAuthJson(this.authJsonPath, authObj);
  }

  async sign(pass) {
    const role = await this.getRole(pass);
    const token = jwt.sign(role, this.secret, { expiresIn: '1h' });
    const activeTokens = await this.getActiveTockens();
    if (!activeTokens.includes(token)) {
      activeTokens.push(token);
      await this.updateActiveTokens(activeTokens);
    }

    return token;
  }

  async verify(token) {
    const activeTokens = await this.getActiveTockens();
    if (activeTokens.includes(token)) {
      try {
        return jwt.verify(token, this.secret);
      } catch(err) {
        await this.unsign(token);
        return false;
      }
    }
    return false;
  }

  async unsign(token) {
    let activeTokens = await this.getActiveTockens();
    activeTokens = activeTokens.filter(activeToken => activeToken !== token);
    return this.updateActiveTokens(activeTokens);
  }

  async getRole(pass) {

    const role = {};

    if (await this.isGuest(pass)) {
      role.isGuest = true;
    }

    if (await this.isTeamMember(pass)) {
      role.isTeamMember = true;
    }

    if (await this.isAdmin(pass)) {
      role.isAdmin = true;
    }

    return Object.keys(role).length ? role : null;
  }

  async isAdmin(pass) {
    const authObj = await Auth.getAuthObj(this.authJsonPath);

    return authObj.password === pass;
  }

  async isTeamMember(pass) {
    const activeHackathon = await this.getActiveHackathon();

    if (!activeHackathon) {
      return false;
    }

    return activeHackathon.teams.some(team => team.members.find(member => member.pass === pass));
  }

  async isGuest(pass) {
    const activeHackathon = await this.getActiveHackathon();

    if (!activeHackathon) {
      return false;
    }

    return activeHackathon.guests.find(guest => guest.pass === pass);
  }

  async getActiveHackathonID() {
    const activeHackathonID = await db.get('active_hackathon_id');

    return activeHackathonID;
  }

  async getActiveHackathon() {

    const currentHackathonID = await this.getActiveHackathonID();

    const hackathons = await db.get('hackathons');

    return hackathons.find(hackathon => hackathon.id === currentHackathonID);
  }
}

export default new Auth({
  authJsonPath: AUTH_JSON_PATH,
  adminPassLength: ADMIN_PASS_LENGTH,
  withNewPassword: env.args.withNewPassword,
});
