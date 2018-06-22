import auth from '../libs/auth';
import { handleInvalidRequest } from '../libs/utils';

export default async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return handleInvalidRequest(res, 401);

  const decoded = await auth.verify(token);

  // TODO ::: Fix or correct exparation time for tokens
  // ex. || decoded.exp <= Date.now() / 1000
  if (!decoded) {
    res.clearCookie('token');
    handleInvalidRequest(res, 401);
  } else {
    req.decodedToken = decoded;
    next();
  }
}
