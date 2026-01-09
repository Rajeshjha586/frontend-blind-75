/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {{start: Function, pause: Function, stop: Function}}
 */
function createResumableInterval(callback, delay, ...args) {
  let timerId;
  let state = "paused";

  function nextState(action) {
    const newState = stateMachine[state][action];

    if (newState === state) {
      return;
    }

    state = newState;
    switch (state) {
      case "paused":
      case "stopped":
        clearInterval(timerId);
        timerId = null;
        return;
      case "running":
        callback(...args);
        timerId = setInterval(callback, delay, ...args);
        return;
    }
  }

  return {
    start: () => nextState("start"),
    pause: () => nextState("pause"),
    stop: () => nextState("stop"),
  };
}

const stateMachine = {
  stopped: {
    pause: "stopped",
    start: "stopped",
    stop: "stopped",
  },
  paused: {
    pause: "paused",
    start: "running",
    stop: "stopped",
  },
  running: {
    pause: "paused",
    start: "running",
    stop: "stopped",
  },
};

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
