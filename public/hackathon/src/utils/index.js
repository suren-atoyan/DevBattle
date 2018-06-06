import { existingRoutes } from 'config';
import Fetch from 'utils/fetch';

const getRouteTitle = location => {
  return location === '/' ? existingRoutes.default : location.split('/')[1].toUpperCase();
}

const omit = (obj, exclude) =>
  Object.keys(obj).reduce((acc, item) =>
    // eslint-disable-next-line
    (!exclude.includes(item) && (acc[item] = obj[item]), acc), {});

async function makeRequest(url, method, data, defaultStatusState = {}) {

  let result = {};

  try {
    const response = await Fetch.request(url, method, data);

    const statusMessageData = response.success
      ? { showStatusMessage: false, statusMessage: {} }
      : { showStatusMessage: true, statusMessage: response };

    // TODO ::: Move to pick mathod ( + implement pick method )
    result = { ...omit(response, ['success']), ...statusMessageData };

  } catch(err) {
    console.log(err);
  }

  result.isLoading = false;

  return { ...defaultStatusState, ...result };
}

export { getRouteTitle, omit, makeRequest };
