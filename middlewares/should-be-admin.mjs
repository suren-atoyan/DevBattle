import { asyncWrapper } from '../libs/utils';
import auth from '../libs/auth';

const shouldBeAdmin = async (req, res, next) => {
  const { cookies : { token } } = req;
  const role = await auth.getRoleByToken(token);

  return role.isAdmin
    ? next()
    : res.status(403).send({ errorMessage: 'You don\'t have permission' });
};

export default asyncWrapper(shouldBeAdmin);
