import auth from '../../libs/auth';
import { asyncWrapper } from '../../libs/utils';

async function _challengeAnswer(req, res) {
  const { cookies : { token }, body } = req;
  const role = await auth.getRoleByToken(token);

  if (role) {
    if (body) {
      const result = { id: body.id, correct: true, errorMessage: null };
      res.status(200).send(result);
    } else {
      res.status(422).send({});
    }
  } else {
    res.status(401).send({ errorMessage: 'Authentication failed.' });
  }
}

const challengeAnswer = asyncWrapper(_challengeAnswer);

export default challengeAnswer;
