import lowDB from 'lowdb';

import FileAsync from 'lowdb/adapters/FileAsync';

import config from '../config';

class DB {

  constructor({ lowDB, FileAsync, config }) {
    this.lowDB = lowDB;
    this.FileAsync = FileAsync;
    this.config = config;
  }

  async connect() {
    const adapter = new FileAsync(config.get('db_path'));

    this.db = await lowDB(adapter);

    await this.setDefaults();

    return this.db;
  }

  async setDefaults() {
    return await this.db
                     .defaults(config.get('default_data'))
                     .write();
  }

  async get(key, value) {
    return await this.db
                     .get(key)
                     .value();
  }

  async setPush(key, value) {
    return await this.db
                     .get(key)
                     .push(value)
                     .write();
  }

  async set(...args) {
    return await this.db
                     .set(...args)
                     .write();
  }

  async update(...args) {
    return await this.db
                     .update(...args)
                     .write()
  }

  async updateActiveHackathonId(id) {
    await this.set('active_hackathon_id', id);
    return id;
  }

  async getActiveHackathon() {
    const hackathons = await this.get('hackathons');
    const activeHackathonId = await this.get('active_hackathon_id');
    const activeHackathon = hackathons.find(hackathon => hackathon._id === activeHackathonId);
    return (
      activeHackathon.teams = activeHackathon.teams.map(team => (delete team.password, team)),
      activeHackathon
    );
  }
}

export default new DB({
  lowDB,
  FileAsync,
  config,
});
