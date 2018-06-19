import vm from 'vm';
import assert from './assert';

export default ({ tests, fnName, fnLength, points, exclude }, source) => {

  const sandbox = Object.create(null); // Instead of {}, for avoiding such kind of code injections
  // vm.runInNewContext("this.constructor.constructor('return process')().exit()")

  let hasPassedTest = false;
  let result = {};

  vm.createContext(sandbox, {
    timeout: 500, // For avoiding such kind of code injections -> while(true) ...
  });

  try {
    if (fnLength && source.length > fnLength) throw new Error('Your code is too long');

    vm.runInContext(`${source}; this.fnName=${fnName};`, sandbox);

    const userFunction = sandbox.fnName;

    if (!userFunction) throw new Error('Your function name is wrong');

    if (exclude && exclude.some(key => source.includes(key))) throw new Error('You are using forbidden symbols or fragments');

    hasPassedTest = tests.every(({ input, output }) => assert(input, output, userFunction));

    if (hasPassedTest) {
      result.success = true;

      if (points && fnLength) {
        const currentPoints = points/2 + ((fnLength - source.length) / fnLength * points / 2);
        result.points = currentPoints;
      }
    } else {
      result = { errorMessage: 'Solution is wrong' };
    }

  } catch (e) {
    return { errorMessage: e.message };
  }

  return result
}
