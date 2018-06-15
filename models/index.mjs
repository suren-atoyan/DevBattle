import db from '../db';
import uuid from 'uuid/v1';
import Joi from 'joi';

export default (name, schema) => new (class Model {
  constructor() {
    this.modelName = name;
    this.schema = schema;
  }

  create(object) {
    const validated = Joi.validate(object, schema);

    if (validated.error) {
      return {
        _error: validated.error.details[0].message,
      };
    }

    return validated.value;
  }
});
