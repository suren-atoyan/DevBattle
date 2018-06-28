import vm from 'vm';
import assert from './assert';
import prepareVM from './prepare-vm';

export default ({ tests, fnName, sourceLength, points, exclude }, source) => {

  const sandbox = Object.create(null); // Write Object.create(null) instead of {}
  // or Object.create({}) or by other declaration of object, for avoiding
  // such kind of code injections mentioned below
  // vm.runInNewContext("this.constructor.constructor('return process')().exit()")

  let hasPassedTest = false;
  let result = {};

  vm.createContext(sandbox);

  try {
    if (sourceLength && source.length > sourceLength) throw new Error('Your code is too long');

    vm.runInContext(`
        ${prepareVM}
        ${source};
        this.fnName=${fnName};
      `,
      sandbox, {
        timeout: 500, // Timeout is set to avoid long executions and/or infinite loops or recursions
      },
    );

    const userFunction = sandbox.fnName;

    if (!userFunction) throw new Error('Your function name is wrong');

    if (exclude && exclude.some(key => source.includes(key))) throw new Error('You are using forbidden symbols or fragments');

    // 1) `userFunction` is running in vm because
    // In line 21 we have executed user sources in vm
    // and we have set timeout to avoid infinite loops' or recursions' execution
    // in source.
    // E.g. user source -> `while(true) ...`
    // But sources like `while(true) ...` can also be inside user defined functions
    // which should be run during tests checking.
    // It means, that user functions should also be running
    // inside vm with timeout

    // 2) `assert` function ( which should check tests ) is running twice because
    // some tests can be passed with solution based on Math.random

    // E.g. If there are challenges which should return true or false
    // ( or 1/0 or something else like those ), user can write answer like this:

    // fn =_ => Math.round(Math.random()) && true || false

    // And theoretically, tests can be passed. The number of tests exponentially decreases
    // chances to pass challenge with random true/false. So, running tests twice decreases
    // chances even more.

    // E.g. Probability to pass a challenge with 10 tests is 1/(2^10), which is about 0.1%
    // Running assert twice reduces the probability to 1/(2^20), which is about 0.0001%
    hasPassedTest = vm.runInContext(
      `
        const assert = ${assert.toString()};
        const tests = ${JSON.stringify(tests)};
        tests.every(
          ({ input, output }) =>
            assert(input, output, ${fnName}) && assert(input, output, ${fnName})
        );
      `,
      sandbox, { timeout: 500 }
    );

    if (hasPassedTest) {
      result.success = true;

      if (points) {
        const currentPoints = sourceLength
          ? points / 2 + ((sourceLength - source.length) / sourceLength * points / 2)
          : points;

        result.points = +currentPoints.toFixed(2);
      }
    } else {
      result = { errorMessage: 'Solution is wrong' };
    }

  } catch (e) {
    return { errorMessage: e.message };
  }

  return result;
}
