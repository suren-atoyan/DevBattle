import Model from '.';
import uuid from 'uuid';

import { teamSchema } from './team';
import { challengeSchema } from './challenge';

import Joi from 'joi';

const hackathonSchema = Joi.object().keys({
  name: Joi.string().min(4).max(30).required(),
  duration: Joi.number().required(),

  teams: Joi.array().items(teamSchema).empty().default([]),
  isGuestTeam: Joi.boolean(),
  challenges: Joi.array().items(challengeSchema).required(),
  _id: Joi.any().forbidden().default(_ => uuid(), 'unique id'),
});

export default Model('hackathon', hackathonSchema);
