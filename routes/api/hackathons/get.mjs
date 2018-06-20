import auth from '../../../libs/auth';
import { asyncWrapper } from '../../../libs/utils';

import { getActiveHackathon } from '../../../models/helpers';

async function getHackathon(req, res) {
  const { cookies : { token } } = req;
  const role = await auth.getRoleByToken(token);

  const result = await getActiveHackathon({ role });
  res.status(200).json(result);
}

export default asyncWrapper(getHackathon);
