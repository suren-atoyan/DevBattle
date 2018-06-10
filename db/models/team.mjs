import Model from './';
import uuid from 'uuid/v1';

import Joi from 'joi';

const teamSchema = {
  name: Joi.string().min(4).max(12).required(),
  password: Joi.string().min(4).max(12).required(),

  count: Joi.number().empty().default(10),
  _id: Joi.any().forbidden().default(_ => uuid(), 'unique id'),
};

export { teamSchema };

export default Model('team', teamSchema);
