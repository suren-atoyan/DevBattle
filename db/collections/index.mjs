import db from '../';

export default class Collection {

  constructor(name, model, defaultValue) {
    this.name = name;
    this.defaultValue = this.defaultValue;
    this.__model = model;
    this.isCollection = true;
  }

  async create() {
    return db.set(this.name, this.defaultValue ? [this.defaultValue] : []);
  }

  async push(object) {
    const currentState = await db.get(this.name);

    if (currentState) {
      if (currentState.some(item => item._id === object._id)) {
        throw Error('Id should be unique');
      }
    } else {
      await this.create();
    }

    return db.setPush(this.name, object);
  }

  async find(object) {
    const collection = await db.get(this.name);

    return collection.find(item => item.id === object.id);
  }

  async remove(object) {
    const collection = (await db.get(this.name)).filter(item => item.id === object.id);

    return db.set(this.name, collection);
  }
}
