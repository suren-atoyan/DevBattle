import vm from 'vm';
import assert from './assert';

export default (requirements, solutionRaw) => {
  const sandbox = {};

  vm.createContext(sandbox);
  vm.runInContext(solutionRaw, sandbox);

  const solution = sandbox[requirements.name];

  return requirements.tests.every(requirement => assert(requirement.input, requirement.output, solution));
}
