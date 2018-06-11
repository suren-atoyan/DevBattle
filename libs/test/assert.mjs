export default (input, output, fn) => JSON.stringify(fn(...input)) === JSON.stringify(output);
