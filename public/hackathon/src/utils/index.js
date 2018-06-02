import { existingRoutes } from 'config';

const getRouteTitle = location => {
  return location === '/' ? existingRoutes.default : location.split('/')[1].toUpperCase();
}

export { getRouteTitle };
