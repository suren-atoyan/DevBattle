import auth from '../../../libs/auth';
import { asyncWrapper, handleInvalidRequest } from '../../../libs/utils';
import { getActiveBattle, startBattle, finishBattle } from '../../../models/helpers';
import { delayExecution } from '../../../libs/cron';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { START_BATTLE, FINISH_BATTLE } } = config.get('uws_server');

async function start(req, res) {
  const activeBattle =  await getActiveBattle();

  if (!activeBattle) return handleInvalidRequest(res, 400, 'no_active');
  if (activeBattle.started) return handleInvalidRequest(res, 400, 'started');

  const { started, startTime } = await startBattle();

  res.status(200).send({ started, startTime });
  broadcast(START_BATTLE, { started, startTime });

  const [ hours, minutes ] = activeBattle.duration.split(':');
  const delay = hours * 3.6e6 + minutes * 6e4;
  delayExecution(startTime, delay, async _ => {
    const { finished } = await finishBattle();
    broadcast(FINISH_BATTLE, { finished });
  });
}

export default asyncWrapper(start);
