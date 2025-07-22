/**
 * @param {Function} func
 * @returns Function
 */
export default function memoize(func) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.call(this, ...args);
    cache.set(key, result);
    return result;
  };
}
