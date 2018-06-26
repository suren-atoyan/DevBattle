import lowDB from 'lowdb';

import FileAsync from 'lowdb/adapters/FileAsync';
import lodashId from 'lodash-id';

class DB {

  config({ path, default_data }) {
    this.db_path = path;
    this.default_data = default_data;
    return this;
  }

  async connect() {
    const adapter = new FileAsync(this.db_path);

    this.db = await lowDB(adapter);

    this.db._.mixin(lodashId);
    this.db._.id = '_id';

    await this.setDefaults(this.default_data);

    return this.db;
  }

  async setDefaults(defaults) {
    return await this.db
      .defaults(defaults)
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
      .write();
  }
}

export default new DB;
