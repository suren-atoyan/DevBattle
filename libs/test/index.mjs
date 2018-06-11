import vm from 'vm';
import assert from './assert';

export default (requirements, solutionRaw) => {
  const sandbox = {};
  let result;

  vm.createContext(sandbox);

  try {
    vm.runInContext(solutionRaw, sandbox);
    const solution = sandbox[requirements.name];

    if (!solution) throw new Error('Your function name is wrong');

    result = requirements.tests.every(({input, output}) => assert(input, output, solution));
  } catch (e) {
    return { errorMessage: e.message };
  }

  return result ? { success: true } : { errorMessage: 'Solution is wrong!' }
}
