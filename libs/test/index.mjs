import vm from 'vm';
import assert from './assert';

export default ({ tests, fnName, fnLength, points, exclude }, source) => {

  const sandbox = Object.create(null); // Write Object.create(null) instead of {}
  // or Object.create({}) or by other declaration of object, for avoiding
  // such kind of code injections mentioned below
  // vm.runInNewContext("this.constructor.constructor('return process')().exit()")

  let hasPassedTest = false;
  let result = {};

  vm.createContext(sandbox);

  try {
    if (fnLength && source.length > fnLength) throw new Error('Your code is too long');

    vm.runInContext(`${source}; this.fnName=${fnName};`, sandbox, {
      timeout: 500, // Timeout is set to avoid long executions and/or infinite loops or recursions
    });

    const userFunction = sandbox.fnName;

    if (!userFunction) throw new Error('Your function name is wrong');

    if (exclude && exclude.some(key => source.includes(key))) throw new Error('You are using forbidden symbols or fragments');

    hasPassedTest = tests.every(({ input, output }) => assert(input, output, userFunction));

    if (hasPassedTest) {
      result.success = true;

      if (points) {
        const currentPoints = fnLength
          ? points / 2 + ((fnLength - source.length) / fnLength * points / 2)
          : points;

        result.points = +currentPoints.toFixed(2);
      }
    } else {
      result = { errorMessage: 'Solution is wrong' };
    }

  } catch (e) {
    return { errorMessage: e.message };
  }

  return result
}
