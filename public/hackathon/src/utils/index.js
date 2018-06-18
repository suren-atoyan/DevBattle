/* eslint-disable no-sequences */
import { existingRoutes } from 'config';
import Fetch from 'utils/fetch';

const getRouteTitle = location => {
  return location === '/' ? existingRoutes.default : location.split('/')[1].toUpperCase();
}

const omit = (obj, exclude) =>
  Object.keys(obj).reduce((acc, item) =>
    (!exclude.includes(item) && (acc[item] = obj[item]), acc), {});

async function makeRequest(url, method, data, defaultStatusState = {}) {

  let result = {};

  try {
    const response = await Fetch.request(url, method, data);

    const statusMessageData = response.success
      ? { showStatusMessage: false, statusMessage: {} }
      : { showStatusMessage: true, statusMessage: response };

    // TODO ::: Move to pick mathod ( + implement pick method )
    result = { ...response, ...statusMessageData };

  } catch(err) {
    console.log(err);
  }

  result.isLoading = false;

  return { ...defaultStatusState, ...result };
}

const removeItem = (arr, i) => {
  const res = arr.slice(0);
  res.splice(i, 1);
  return res;
}

export { getRouteTitle, omit, makeRequest, removeItem };
