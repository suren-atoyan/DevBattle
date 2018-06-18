import lowDB from 'lowdb';

import FileAsync from 'lowdb/adapters/FileAsync';
import lodashId from 'lodash-id';
import mixins from './mixins';

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

    this.db._.mixin(mixins);
    this.db._.mixin(lodashId);
    this.db._.id = '_id';

    await this.setDefaults();

    return this.db;
  }

  async setDefaults() {
    return await this.db
                    .defaults(config.get('default_data'))
                    .write();
  }

  get(key, withLodashWrapper) {
    return withLodashWrapper
      ? this.db.get(key)
      : this.db.get(key).value();
  }

  async insert(key, value) {
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
}

export default new DB({
  lowDB,
  FileAsync,
  config,
});
