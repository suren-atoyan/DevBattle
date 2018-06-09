import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';

const checkToken = async (req, res) => {
  const { token } = req.cookies;

  const { pass, exp, iat, ...role } = await auth.verify(token);

  res.send(role || {});
}

export default asyncWrapper(checkToken);
