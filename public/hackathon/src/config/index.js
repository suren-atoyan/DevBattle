const existingRoutes = {
  default: 'MONITORING',
  // TODO ::: Add all routes here
}

const { NODE_ENV, REACT_APP_LOCAL_SERVER_URL } = process.env;

const url = {
  base_url: `${NODE_ENV === 'development' ? REACT_APP_LOCAL_SERVER_URL : ''}/api/v1.0.0`,
  login: '/login',
  logout: '/logout',
  check_tocken: '/check_token',
  hackathons: '/hackathons',
  challenge_answer: '/challenge_answer',
  create_team: '/team',
  start_hackathon: '/hackathons/start',
  finish_hackathon: '/hackathons/finish',
  monaco_loader: '/monaco-editor/vs/loader.js',
  monaco_base: '/monaco-editor/vs',
}

export {
  existingRoutes,
  url,
  REACT_APP_LOCAL_SERVER_URL as localServerUrl,
};
