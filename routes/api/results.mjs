import { asyncWrapper } from '../../libs/utils';

import auth from '../../libs/auth';

import { getActiveBattle } from '../../models/helpers';

const _getResults = async (req, res) => {
  const { cookies : { token } } = req;

  const role = await auth.getRoleByToken(token);

  const battle = await getActiveBattle({ role });

  res.status(200).send(battle.results);
}

const getResults = asyncWrapper(_getResults);

export { getResults };
