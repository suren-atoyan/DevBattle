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
  team: '/team',
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

const helperTexts = {
  fnName: 'It is the name of the function, which will be called after the execution of your code, and to which the test parameters will be passed. You can write additional variables or functions too, but the function with this very name will be called.',
  sourceLength: 'This is the maximum length of the source, that can be used for passing the challenge. Pay attention that challenges can also be passed by less number of characters than is mentioned here and you will get additional points for that. More in Points section.',
  exclude: 'Those are symbols/fragments that you can\'t use in your source.',
  points: 'These are the points that are given for the challenge. If the challenge has a source limitation, it means that when you satisfy to the specified limitations you get the points mentioned here and if you write the code shorter you can get bonus with the size of the points mentioned here.',
}

const messages = {
  durationWarning: 'Please match the following pattern <HOURS>:<MINUTES>',
  deletedTeamAlert: 'UFO came and has stolen your team from our DB',
};

export {
  existingRoutes,
  consoleWarnDefaultText,
  consoleWarnTextStyles,
  helperTexts,
  messages,
  url,
  maximum_allowed_code_length,
  REACT_APP_LOCAL_SERVER_URL as localServerUrl,
};
