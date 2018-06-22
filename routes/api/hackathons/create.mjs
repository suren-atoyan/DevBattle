import { asyncWrapper, handleInvalidRequest } from '../../../libs/utils';

import hackathon from '../../../models/hackathon';
import auth from '../../../libs/auth';
import {
  updateActiveHackathonId,
  addNewHackathon,
} from '../../../models/helpers';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { CREATE_HACKATHON } } = config.get('uws_server');

async function createHackathon(req, res) {
  const { body } = req;

  if(!body) return handleInvalidRequest(res, 400, 'no_data');

  const currentHackathon = hackathon.create(body);

  if (currentHackathon._error) return handleInvalidRequest(res, 400, currentHackathon._error);

  await addNewHackathon(currentHackathon);
  await updateActiveHackathonId(currentHackathon._id);

  res.status(200).send(currentHackathon);
  broadcast(CREATE_HACKATHON, currentHackathon);
}

export default asyncWrapper(createHackathon);
