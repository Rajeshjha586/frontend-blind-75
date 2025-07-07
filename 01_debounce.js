/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */

function debounce(func, wait) {
  let timeoutId = null;
  let lastArgs = null;
  let lastContext = null;

  function debounced(...args) {
    lastArgs = args;
    lastContext = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      func.apply(lastContext, lastArgs);
    }, wait);
  }

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
    lastArgs = lastContext = null;
  };

  debounced.flush = function () {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      func.apply(lastContext, lastArgs);
      timeoutId = null;
      lastArgs = lastContext = null;
    }
  };

  return debounced;
}

function logMessage(msg) {
  console.log("Debounced:", msg);
}

const debouncedLog = debounce(logMessage, 5000);

debouncedLog("Hello");
debouncedLog("World"); // Only "World" will be logged after 5 sec

// To cancel before execution
// debouncedLog.cancel();

// To execute immediately before timer fires
// debouncedLog.flush();

/**************************************************************************** */

// function debounce(func, wait) {
//   let timeoutID = null;

//   return function (...args) {
//     const context = this;
//     clearTimeout(timeoutID);

//     timeoutID = setTimeout(function () {
//       timeoutID = null;
//       func.apply(context, args);
//     }, wait);
//   };
// }
