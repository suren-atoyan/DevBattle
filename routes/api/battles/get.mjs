import auth from '../../../libs/auth';
import { asyncWrapper } from '../../../libs/utils';

import { getActiveBattle } from '../../../models/helpers';

async function getBattle(req, res) {
  const { cookies : { token } } = req;
  const role = await auth.getRoleByToken(token);

  const result = await getActiveBattle({ role });
  res.status(200).json(result);
}

export default asyncWrapper(getBattle);
