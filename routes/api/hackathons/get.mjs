import { asyncWrapper } from '../../../libs/utils';

import { getActiveHackathon } from '../../../models/helpers';

async function getHackathon(req, res) {
  const result = await getActiveHackathon();
  res.status(200).json(result);
}

export default asyncWrapper(getHackathon);
