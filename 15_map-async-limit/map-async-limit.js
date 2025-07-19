/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
export default function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
  if (!Array.isArray(iterable)) {
    return Promise.reject(
      new TypeError("Expected an array as the first argument")
    );
  }

  if (iterable.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let index = 0;
    let completed = 0;
    let running = 0;

    function runNext() {
      // If all tasks are done, resolve
      if (completed === iterable.length) {
        return resolve(results);
      }

      // Start new tasks while under limit
      while (running < size && index < iterable.length) {
        const currentIndex = index++;
        running++;

        Promise.resolve(callbackFn(iterable[currentIndex]))
          .then((res) => {
            results[currentIndex] = res;
            running--;
            completed++;
            runNext(); // Starting the next task
          })
          .catch(reject); // On first failure, reject entire promise
      }
    }

    runNext(); // Kick things off
  });
}
