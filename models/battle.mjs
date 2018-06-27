import Model from '.';
import uuid from 'uuid';

import { teamSchema } from './team';
import { challengeSchema } from './challenge';

import Joi from 'joi';

const battleSchema = Joi.object().keys({
  name: Joi.string().min(3).max(40).required(),
  duration: Joi.string().required(),

  teams: Joi.array().items(teamSchema).empty().default([]),
  isGuestTeam: Joi.boolean(),
  challenges: Joi.array().items(challengeSchema).required(),

  startTime: Joi.number(),
  started: Joi.boolean().empty().default(false),
  finished: Joi.boolean().empty().default(false),

  results: Joi.object().empty().default({
    guests: {
      confirmedSolutions: [],
      score: 0,
    },
  }),

  _id: Joi.any().forbidden().default(_ => uuid(), 'unique id'),
});

export default Model('battle', battleSchema);
