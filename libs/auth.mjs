import crypto from 'crypto';
import bcrypt from 'bcrypt';
import fs from './promisify-fs';
import path from 'path';
import config from '../config';
import env from './env';
import jwt from 'jsonwebtoken';
import db from '../db';

// TODO ::: It will be removed after Node 10 LTS verion.
import __getDirname from './__dirname';
const __dirname = __getDirname(import.meta.url);

class Auth {
  static genRandomCryptoString(len) {
    // TODO ::: Replace crypto to tls.createSecureContext
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  }

  static async genSalt(saltRounds) {
    return bcrypt.genSalt(saltRounds);
  }

  static async hashPassword(password, salt) {
    return bcrypt.hash(password, salt);
  }

  static async genPassword(password) {
    const salt = await Auth.genSalt(config.get('default_salt_rounds'));
    return Auth.hashPassword(password, salt);
  }

  async run() {
    return this.checkAndGenAdminPasswordAndSecret();
  }

  async checkAndGenAdminPasswordAndSecret() {
    const admin = await db.get('admin');
    const secret = await db.get('secret');

    if (!admin.password) {
      const defaultPassword = config.get('default_admin_password');
      const password = await Auth.genPassword(defaultPassword);
      await db.set('admin.password', password);
    }

    if (!secret) {
      const secret = Auth.genRandomCryptoString(10);
      await db.set('secret', secret);
    }
  }

  async sign(role) {
    const token = jwt.sign(role, await db.get('secret'));

    const activeTokens = await db.get('active_tokens');
    if (!activeTokens.includes(token)) {
      await db.setPush('active_tokens', token);
    }

    return token;
  }

  async verify(token) {
    const activeTokens = await db.get('active_tokens');
    if (activeTokens.includes(token)) {
      try {
        return jwt.verify(token, await db.get('secret'));
      } catch(err) {
        await this.unsign(token);
        return false;
      }
    }

    return false;
  }

  async unsign(token) {
    let activeTokens = await db.get('active_tokens');
    activeTokens = activeTokens.filter(activeToken => activeToken !== token);
    return db.set('active_tokens', activeTokens);
  }

  async checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  async getRole(pass) {
    const role = {};

    if (await this.isAdmin(pass)) {
      role.isAdmin = true;
    }

    // if (await this.isTeamMember(pass)) {
    //   role.isTeamMember = true;
    // }

    return Object.keys(role).length ? role : null;
  }

  async getRoleByToken(token) {
    const { pass } = await this.verify(token);

    const role = this.getRole(pass);

    return role || await this.isGuest(token);
  }

  async isAdmin(pass) {
    const adminPass = await db.get('admin.password');

    return await this.checkPassword(pass, adminPass);
  }

  async isTeamMember(pass) {
    const activeHackathon = await this.getActiveHackathon();

    if (!activeHackathon) {
      return false;
    }

    return activeHackathon.teams.some(team => team.members.find(member => member.pass === pass));
  }

  async isGuest(token) {
    const activeTokens = await db.get('active_tockens');

    return activeTokens.includes(token);
  }
}

export default new Auth();
