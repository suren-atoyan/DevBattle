import auth from '../../../libs/auth';
import { asyncWrapper } from '../../../libs/utils';
import { getActiveHackathon, finishHackathon } from '../../../models/helpers';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { FINISH_HACKATHON } } = config.get('uws_server');

async function finish(req, res) {
  const activeHackathon =  await getActiveHackathon();

  if (!activeHackathon) {
    res.status(422).send({ errorMessage: 'No active hackaton.' });
  } else if (activeHackathon.finished) {
    res.status(422).send({ errorMessage: 'Hackathon has already finished.' });
  } else if (!activeHackathon.started) {
    res.status(422).send({ errorMessage: 'Hackathon hasn\'t yet started.' });
  } else {
    const { finished } = await finishHackathon();
    res.status(200).send({ finished });
    broadcast(FINISH_HACKATHON, { finished });
  }
}

export default asyncWrapper(finish);
