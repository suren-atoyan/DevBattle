import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';

const logout = async (req, res) => {
  const { token } = req.cookies;
  await auth.unsign(token);

  res.setHeader(
    'Set-Cookie', 'token=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'
  );

  res.send({});
}

export default asyncWrapper(logout);
