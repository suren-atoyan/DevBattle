import auth from '../../../libs/auth';
import { asyncWrapper } from '../../../libs/utils';
import { getActiveHackathon, startHackathon } from '../../../models/helpers';

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
      res.send({ started, startTime });
    }
  }
}

export default asyncWrapper(start);
