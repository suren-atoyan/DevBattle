import { asyncWrapper, handleInvalidRequest } from '../libs/utils';
import auth from '../libs/auth';

const shouldBeAdmin = async (req, res, next) => {
  const { cookies : { token } } = req;
  const role = await auth.getRoleByToken(token);

  return role.isAdmin
    ? next()
    : handleInvalidRequest(res, 403, 'not_admin');
};

export default asyncWrapper(shouldBeAdmin);
