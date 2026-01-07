/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {{start: Function, pause: Function, stop: Function}}
 */
function createResumableInterval(callback, delay, ...args) {
  let timerId = null;
  let stopped = false;

  function start() {
    if (stopped || timerId != null) {
      return;
    }

    callback(...args);
    timerId = setInterval(callback, delay, ...args);
  }

  function clearTimer() {
    clearInterval(timerId);
    timerId = null;
  }

  function pause() {
    if (stopped) {
      return;
    }

    clearTimer();
  }

  function stop() {
    stopped = true;
    clearTimer();
  }

  return {
    start,
    pause,
    stop,
  };
}

let i = 0;
// t = 0:
const interval = createResumableInterval(() => {
  i++;
}, 10);
// t = 10;
interval.start(); // i is now 1.
// t = 20: callback executes and i is now 2.
// t = 25:
console.log(i);
interval.pause();
// t = 30: i remains at 2 because interval.pause() was called.
// t = 35:
console.log(i);
interval.start(); // i is now 3.
// t = 45: callback executes and i is now 4.
// t = 50:
console.log(i);
interval.stop(); // i remains at 4.
console.log(i);
