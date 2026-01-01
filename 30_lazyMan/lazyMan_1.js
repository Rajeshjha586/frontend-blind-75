// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

const ACTIONS = {
  GREET: "greet",
  EAT: "eat",
  SLEEP: "sleep",
};

class ALazyMan {
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;

    this.normalTasks = [];
    this.urgentTasks = [];

    this.greet();
    Promise.resolve().then(() => this._triggerNext());
  }

  greet() {
    this.normalTasks.push([ACTIONS.GREET]);
    return this;
  }

  eat(food) {
    this.normalTasks.push([ACTIONS.EAT, food]);
    return this;
  }

  sleep(delay) {
    this.normalTasks.push([ACTIONS.SLEEP, delay]);
    return this;
  }

  sleepFirst(delay) {
    this.urgentTasks.push([ACTIONS.SLEEP, delay]);
    return this;
  }

  _sleepPromise(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  _triggerNext() {
    let task = this.urgentTasks.shift();
    if (!task) {
      task = this.normalTasks.shift();
    }

    if (!task) {
      return;
    }

    const [action, param] = task;

    switch (action) {
      case ACTIONS.GREET:
        this.callback(`Hi, I'm ${this.name}`);
        this._triggerNext();
        return;
      case ACTIONS.EAT:
        this.callback(`Eat ${param}`);
        this._triggerNext();
        return;
      case ACTIONS.SLEEP:
        this._sleepPromise(param).then(() => {
          this.callback(`Wake up after ${param} second${param > 1 ? "s" : ""}`);
          this._triggerNext();
        });
        return;
      default:
        this._triggerNext();
    }
  }
}

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */

function LazyMan(name, logFn) {
  return new ALazyMan(name, logFn);
}

LazyMan("Jack", console.log)
  .eat("banana")
  .sleepFirst(15)
  .sleep(10)
  .eat("apple")
  .sleepFirst(5)
  .sleep(3);

// LazyMan("Jack", console.log).eat("banana").sleepFirst(10).eat("apple").sleep(1);
