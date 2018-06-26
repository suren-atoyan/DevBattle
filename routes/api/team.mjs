import { asyncWrapper, handleInvalidRequest } from '../../libs/utils';

import team from '../../models/team';
import auth from '../../libs/auth';
import { createNewTeam, deleteTeamById } from '../../models/helpers';

import { broadcast } from '../../ws/helpers';
import config from '../../config';

const { action_types: { CREATE_TEAM, DELETE_TEAM } } = config.get('uws_server');

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

async function _deleteTeam(req, res) {
  const { params: { id } } = req;

  if (!id) return handleInvalidRequest(res, 400, 'invalid_data');

  const changes = await deleteTeamById(id);

  const payload = {
    teamId: id,
    changes,
  }

  res.status(200).send(payload);
  broadcast(DELETE_TEAM, payload);
}

const createTeam = asyncWrapper(_createTeam);
const deleteTeam = asyncWrapper(_deleteTeam);

export {
  createTeam,
  deleteTeam,
};
