import vm from 'vm';
import assert from './assert';

export default (requirements, code) => {
  const sandbox = {};
  let result;

  vm.createContext(sandbox);

  try {
    if (requirements.length && code.length > requirements.length) throw new Error('Your code is too long');

    vm.runInContext(code, sandbox);
    const userFunction = sandbox[requirements.name];
    if (!userFunction) throw new Error('Your function name is wrong');

    result = requirements.tests.every(({input, output}) => assert(input, output, userFunction));
  } catch (e) {
    return { errorMessage: e.message };
  }

  return result ? { success: true } : { errorMessage: 'Solution is wrong' }
}
