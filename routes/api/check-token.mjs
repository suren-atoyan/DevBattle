import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';

const checkToken = async (req, res) => {
  const { token } = req.cookies;
  const { pass, exp, iat, ...rest } = await auth.verify(token);

  res.send(rest.role || {});
}

export default asyncWrapper(checkToken);
