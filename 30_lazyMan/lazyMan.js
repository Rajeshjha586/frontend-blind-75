// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

class ALazyMan {
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;

    this.normalTasks = [];
    this.urgentTasks = [];

    this.greet();
    setTimeout(() => {
      this._triggerNext();
    }, 0);
  }

  greet() {
    this.normalTasks.push(["greet"]);
    return this;
  }

  eat(food) {
    this.normalTasks.push(["eat", food]);
    return this;
  }

  sleep(delay) {
    this.normalTasks.push(["sleep", delay]);
    return this;
  }

  sleepFirst(delay) {
    this.urgentTasks.push(["sleep", delay]);
    return this;
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
      case "greet":
        this.callback(`Hi, I'm ${this.name}`);
        this._triggerNext();
        return;
      case "eat":
        this.callback(`Eat ${param}`);
        this._triggerNext();
        return;
      case "sleep":
        setTimeout(() => {
          this.callback(`Wake up after ${param} second${param > 1 ? "s" : ""}`);
          this._triggerNext();
          return;
        }, param * 1000);
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

LazyMan("Jack", console.log).eat("banana").sleep(10).eat("apple").sleep(1);

// LazyMan("Jack", console.log).eat("banana").sleepFirst(10).eat("apple").sleep(1);
