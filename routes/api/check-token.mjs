import auth from '../../libs/auth';

export default async (req, res) => {
  const { token } = req.cookies;
  const { pass, exp, iat, ...rest } = await auth.verify(token);
  
  res.send(rest.role || {});
}
