/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(iterable) {
  if (!Array.isArray(iterable)) {
    return Promise.reject(new TypeError("Argument must be an array"));
  }

  let isFulfilled = false;
  const errorList = new Array(iterable.length);
  let numOfErrors = 0;

  return new Promise((resolve, reject) => {
    if (!iterable.length) {
      return reject(
        new AggregateError([], "No Promise in Promise.any was resolved")
      );
    }

    iterable.forEach((promise, index) => {
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }

      promise.then(
        (value) => {
          if (isFulfilled) {
            return;
          }

          resolve(value);
          isFulfilled = true;
        },
        (reason) => {
          errorList[index] = reason;
          numOfErrors++;

          if (numOfErrors === iterable.length) {
            reject(new AggregateError(errorList, "All promise are rejected"));
          }
        }
      );
    });
  });
}
