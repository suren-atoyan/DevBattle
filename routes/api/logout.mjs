import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';

const logout = async (req, res) => {
  const { token } = req.cookies;
  await auth.unsign(token);

  res.send({});
}

export default asyncWrapper(logout);
