import Model from './';
import uuid from 'uuid/v1';

import Joi from 'joi';

const challengeSchema = Joi.object().keys({
  name: Joi.string().min(4).max(12).required(),
  description: Joi.string().min(1).max(500).required(),
  hasCodeEditor: Joi.boolean(),
  _id: Joi.any().forbidden().default(_ => uuid(), 'unique id'),
});

export { challengeSchema };

export default Model('challenge', challengeSchema);
