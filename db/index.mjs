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

  async getActiveHackathon(withLodashWrapper, withPasswords) {
    const activeHackathonId = await this.get('active_hackathon_id');
    let activeHackathon = await this.db.get('hackathons').find({ _id: activeHackathonId });

    if (withLodashWrapper) {
      return activeHackathon;
    }

    activeHackathon = { ...(await activeHackathon.value()) };

    return withPasswords
      ? activeHackathon
      : activeHackathon
      ? (
          activeHackathon.teams = activeHackathon.teams.map(team => {
            const { password, ...withoutPassword } = team;
            return withoutPassword;
          }),
          activeHackathon
        )
      : null;
  }

  async createNewTeam(team) {
    const currentHackathon = await this.getActiveHackathon(true);

    const teams = currentHackathon.get('teams');

    const isTeamNameUnique = await !teams.find({ name: team.name.trim() }).value();

    if (isTeamNameUnique) {
      await teams.push(team).write();
      const { password, ...withoutPassword } = team;
      return {
        success: true,
        team: withoutPassword,
      };
    } else {
      return {
        success: false,
        errorMessage: 'Team name should be unique',
      }
    }
  }
}

export default new DB({
  lowDB,
  FileAsync,
  config,
});
