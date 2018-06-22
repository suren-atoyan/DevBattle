import { asyncWrapper, handleInvalidRequest } from '../../libs/utils';

import team from '../../models/team';
import auth from '../../libs/auth';
import { createNewTeam } from '../../models/helpers';

import { broadcast } from '../../ws/helpers';
import config from '../../config';

const { action_types: { CREATE_TEAM } } = config.get('uws_server');

async function _createTeam(req, res) {
  const { body } = req;

  if (!body) return handleInvalidRequest(res, 400, 'invalid_data');

  const currentTeam = team.create(body);

  if (currentTeam._error) return handleInvalidRequest(res, 400, currentTeam._error);

  currentTeam.password = await auth.genPassword(currentTeam.password);
  const result = await createNewTeam(currentTeam);

  if (!result.success) return handleInvalidRequest(res, 400, result.errorMessage);

  res.status(200).send(result.team);
  broadcast(CREATE_TEAM, result.team);
}

const createTeam = asyncWrapper(_createTeam);
export { createTeam };
