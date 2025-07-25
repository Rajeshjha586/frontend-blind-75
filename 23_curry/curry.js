/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  return function innerCurry(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return (...args2) => {
      return innerCurry.apply(this, args.concat(args2));
    };
  };
}
