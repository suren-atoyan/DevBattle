// const JSON = Object.freeze(global.JSON) is used to avoid such kind of clever things
// f = _ => JSON.stringify = _ => undefined
// or
// JSON = { stringify: _=> true };
// Assert function is using JSON.stringify during comparing tests' results
// and assert function is running in the same vm instance
// explanation is in ./index file

// And the same thing for Array
// E.g Array = ... or Array.prototype = ... or Array.prototype.every = ...

const prepareVM = `
  const Array = this.Array;
  Object.freeze(Array);
  Object.freeze(Array.prototype);
  const JSON = Object.freeze(this.JSON);
`;

export default prepareVM;
