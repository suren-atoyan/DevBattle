export default (input, output, fn) => {
    try {
        return JSON.stringify(fn(...input)) === JSON.stringify(output);
    } catch {
        return false;
    }
}
