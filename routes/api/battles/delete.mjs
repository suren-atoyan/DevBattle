import auth from '../../../libs/auth';
import { asyncWrapper, handleInvalidRequest } from '../../../libs/utils';
import { getActiveBattle, deleteActiveBattle } from '../../../models/helpers';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { DELETE_BATTLE } } = config.get('uws_server');

async function deleteBattle(req, res) {
  const activeBattle =  await getActiveBattle();

  if (!activeBattle) return handleInvalidRequest(res, 400, 'no_active');

  await deleteActiveBattle();
  res.status(200).send({});
  broadcast(DELETE_BATTLE, {});
}

export default asyncWrapper(deleteBattle);
