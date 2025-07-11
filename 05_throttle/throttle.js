/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {
  let shouldThrottle = false;
  let lastArgs = null;
  // let lastCall = 0;

  const timeoutHandler = () => {
    if (lastArgs) {
      func.apply(this, lastArgs);
      lastArgs = null;
      setTimeout(timeoutHandler, wait);
    } else {
      shouldThrottle = false;
    }
  };

  return function (...args) {
    // const now = Date.now();
    // if (now - lastCall < wait) {
    //   return;
    // }
    // lastCall = now;

    if (shouldThrottle) {
      lastArgs = args;
      return;
    }

    func.apply(this, args);
    shouldThrottle = true;
    setTimeout(timeoutHandler, wait);
  };
}
