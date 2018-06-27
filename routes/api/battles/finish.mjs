import auth from '../../../libs/auth';
import { asyncWrapper, handleInvalidRequest } from '../../../libs/utils';
import { getActiveBattle, finishBattle } from '../../../models/helpers';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { FINISH_BATTLE } } = config.get('uws_server');

async function finish(req, res) {
  const activeBattle =  await getActiveBattle();

  if (!activeBattle) return handleInvalidRequest(res, 400, 'no_active');
  if (!activeBattle.started) return handleInvalidRequest(res, 400, 'not_started');
  if (activeBattle.finished) return handleInvalidRequest(res, 400, 'finished');

  const { finished } = await finishBattle();
  res.status(200).send({ finished });
  broadcast(FINISH_BATTLE, { finished });
}

export default asyncWrapper(finish);
