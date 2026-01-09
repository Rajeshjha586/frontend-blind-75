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

const interval = createResumableInterval(() => {
  console.log("Interval callback executed!");
}, 1000);

interval.start();

setTimeout(() => {
  interval.pause();
}, 2000);

setTimeout(() => {
  interval.start();
}, 2000);

setTimeout(() => {
  interval.stop();
}, 7000);
