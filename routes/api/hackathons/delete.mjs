import auth from '../../../libs/auth';
import { asyncWrapper } from '../../../libs/utils';
import { getActiveHackathon, deleteActiveHackathon } from '../../../models/helpers';

import { broadcast } from '../../../ws/helpers';
import config from '../../../config';

const { action_types: { DELETE_HACKATHON } } = config.get('uws_server');

async function deleteHackathon(req, res) {
  const { cookies : { token }, body } = req;
  const role = await auth.getRoleByToken(token);

  // TODO ::: Remove this after implementing shouldBeAdmin middleware
  if(!role) {
    res.status(401).send({ errorMessage: 'Authentication failed.' });
    return;
  } else if (!role.isAdmin) {
    res.status(403).send({ errorMessage: 'You don\'t have permission' });
    return;
  }

  const activeHackathon =  await getActiveHackathon();
  if (!activeHackathon) {
    res.status(422).send({ errorMessage: 'No active hackaton.' });
  } else {
    await deleteActiveHackathon();
    res.status(200).send({});
    broadcast(DELETE_HACKATHON, {});
  }
}

export default asyncWrapper(deleteHackathon);
