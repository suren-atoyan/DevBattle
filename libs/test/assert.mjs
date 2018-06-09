export default (input, output, fn) => {
  try {
    return JSON.stringify(fn(...input)) === JSON.stringify(output);
  } catch(err) {
    console.log(err)
    // TODO ::: Catch error message for sending users
    return false;
  }
}
