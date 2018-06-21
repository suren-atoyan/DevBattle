import auth from '../../../libs/auth';
import { asyncWrapper } from '../../../libs/utils';
import { getActiveHackathon, startHackathon, finishHackathon } from '../../../models/helpers';
import { delayExecution } from '../../../libs/cron';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { START_HACKATHON, FINISH_HACKATHON } } = config.get('uws_server');

async function start(req, res) {
  const { cookies : { token }, body } = req;
  const role = await auth.getRoleByToken(token);

  if (!role) {
    res.status(401).send({ errorMessage: 'Authentication failed.' });
  } else if (!role.isAdmin) {
    res.status(403).send({ errorMessage: `You don't have permission.` });
  } else {
    const activeHackathon =  await getActiveHackathon();
    if (!activeHackathon) res.status(422).send({ errorMessage: 'No active hackaton.' });
    else if (activeHackathon.started) res.status(422).send({ errorMessage: 'Hackathon has already started' });
    else {
      const { started, startTime } = await startHackathon();
      res.status(200).send({ started, startTime });
      broadcast(START_HACKATHON, { started, startTime });

      const [ hours, minutes ] = activeHackathon.duration.split(':');
      const delay = hours * 3.6e6 + minutes * 6e4;
      delayExecution(startTime, delay, async _ => {
        const { finished } = await finishHackathon();
        broadcast(FINISH_HACKATHON, { finished });
      });
    }
  }
}

export default asyncWrapper(start);
