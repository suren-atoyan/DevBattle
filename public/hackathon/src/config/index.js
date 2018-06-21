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
  hackathons: '/hackathons',
  challenge_answer: '/challenge_answer',
  create_team: '/team',
  get_results: '/results',
  start_hackathon: '/hackathons/start',
  finish_hackathon: '/hackathons/finish',
  monaco_loader: '/monaco-editor/vs/loader.js',
  monaco_base: '/monaco-editor/vs',
  ws: 'ws://localhost:9000',
}

const maximum_allowed_code_length = 500;

export {
  existingRoutes,
  url,
  maximum_allowed_code_length,
  REACT_APP_LOCAL_SERVER_URL as localServerUrl,
};
