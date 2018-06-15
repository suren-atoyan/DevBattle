import vm from 'vm';
import assert from './assert';

export default ({ tests, fnName, fnLength }, source) => {

  const sandbox = {};
  let result;

  vm.createContext(sandbox);

  try {
    if (fnLength && source.length > fnLength) throw new Error('Your code is too long');

    vm.runInContext(source, sandbox);
    const userFunction = sandbox[fnName];
    if (!userFunction) throw new Error('Your function name is wrong');

    result = tests.every(({ input, output }) => assert(input, output, userFunction));
  } catch (e) {
    return { errorMessage: e.message };
  }

  return result ? { success: true } : { errorMessage: 'Solution is wrong' }
}
