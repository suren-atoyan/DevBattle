const existingRoutes = {
  default: 'MONITORING',
  // TODO ::: Add all routes here
}

const { NODE_ENV, REACT_APP_LOCAL_SERVER_URL } = process.env;

const url = {
  base_url: `${NODE_ENV === 'development' ? REACT_APP_LOCAL_SERVER_URL : ''}/api/v1.0.0`,
  login: '/login',
  logout: '/logout',
  check_token: '/check_token',
  admin: '/admin',
  hackathons: '/hackathons',
  challenge_answer: '/challenge_answer',
  create_team: '/team',
  get_results: '/results',
  start_hackathon: '/hackathons/start',
  finish_hackathon: '/hackathons/finish',
  monaco_loader: '/monaco-editor/vs/loader.js',
  monaco_base: '/monaco-editor/vs',
  ws: `ws://${window.location.host.split(':')[0]}:9000`,
  // TODO ::: Find more optimize and funny gif
  console_image: 'https://media.tenor.com/images/41a0802c644036ad7f9e6830fbc8cafa/tenor.gif',
}

const maximum_allowed_code_length = 500;

const consoleWarnDefaultText = 'What are you doing here man? Maybe, it\'ll be better to solve challenges?';

const consoleWarnTextStyles = `
  font-family:  'Hoefler Text', Georgia, 'Times New Roman', serif;
  font-weight: normal;
  font-size: 1.75em;
  letter-spacing: .2em;
  line-height: 1.1em;
  margin:0px;
  text-align: center;
  text-transform: uppercase;
`;

export {
  existingRoutes,
  consoleWarnDefaultText,
  consoleWarnTextStyles,
  url,
  maximum_allowed_code_length,
  REACT_APP_LOCAL_SERVER_URL as localServerUrl,
};
