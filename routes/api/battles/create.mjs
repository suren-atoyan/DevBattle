import { asyncWrapper, handleInvalidRequest } from '../../../libs/utils';

import battle from '../../../models/battle';
import auth from '../../../libs/auth';
import {
  updateActiveBattleId,
  addNewBattle,
} from '../../../models/helpers';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { CREATE_BATTLE } } = config.get('uws_server');

async function createBattle(req, res) {
  const { body } = req;

  if(!body) return handleInvalidRequest(res, 400, 'no_data');

  const currentBattle = battle.create(body);

  if (currentBattle._error) return handleInvalidRequest(res, 400, currentBattle._error);

  await addNewBattle(currentBattle);
  await updateActiveBattleId(currentBattle._id);

  res.status(200).send(currentBattle);
  broadcast(CREATE_BATTLE, currentBattle);
}

export default asyncWrapper(createBattle);
