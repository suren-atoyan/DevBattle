import auth from '../../../libs/auth';
import { asyncWrapper, handleInvalidRequest } from '../../../libs/utils';
import { getActiveHackathon, finishHackathon } from '../../../models/helpers';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { FINISH_HACKATHON } } = config.get('uws_server');

async function finish(req, res) {
  const activeHackathon =  await getActiveHackathon();

  if (!activeHackathon) return handleInvalidRequest(res, 400, 'no_active');
  if (!activeHackathon.started) return handleInvalidRequest(res, 400, 'not_started');
  if (activeHackathon.finished) return handleInvalidRequest(res, 400, 'finished');

  const { finished } = await finishHackathon();
  res.status(200).send({ finished });
  broadcast(FINISH_HACKATHON, { finished });
}

export default asyncWrapper(finish);
