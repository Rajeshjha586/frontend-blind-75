const PROMISE_STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

function CustomPromise(executor) {
  let state = PROMISE_STATUS.PENDING;
  let value = null;
  let handlers = [];
  let catches = [];

  function resolve(result) {
    if (state !== PROMISE_STATUS.PENDING) {
      return;
    }

    state = PROMISE_STATUS.FULFILLED;
    value = result;

    handlers.forEach((handler) => handler(value));
  }

  function reject(error) {
    if (state !== PROMISE_STATUS.PENDING) {
      return;
    }

    state = PROMISE_STATUS.REJECTED;
    value = error;

    catches.forEach((c) => c(error));
  }

  this.then = function (callback) {
    if (state === PROMISE_STATUS.FULFILLED) {
      callback(value);
    } else {
      handlers.push(callback);
    }
  };

  executor(resolve, reject);
}

const doWork = (res, rej) => {
  setTimeout(() => {
    res("Hello! Promise");
  }, 1000);
};

let someText = new CustomPromise(doWork);

someText.then((value) => {
  console.log("1st Log: ", value);
});

someText.then((value) => {
  console.log("2nd Log: ", value);
});

setTimeout(() => {
  someText.then((value) => {
    console.log("3rd Log: ", value);
  });
}, 3000);
