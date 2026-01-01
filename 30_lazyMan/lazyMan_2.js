const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
interface Laziness {
  sleep: (time: number) => Laziness
  sleepFirst: (time: number) => Laziness
  eat: (food: string) => Laziness
}
*/
/**
 * @param {string} name
 * @param {(log: string) => void} callback
 * @returns {Laziness}
 */
function LazyMan(name, callback) {
  const tasks = [["greet", name]];
  const actions = {
    greet: (name) => callback(`Hi, I'm ${name}.`),
    eat: (food) => callback(`Eat ${food}.`),
    sleep: (ms) =>
      sleep(ms * 1000).then(() =>
        callback(`Wake up after ${ms} second${ms > 1 ? "s" : ""}.`)
      ),
  };
  Promise.resolve().then(exec);
  async function exec() {
    for (const [cmd, val] of tasks) {
      await actions[cmd](val);
    }
  }
  return {
    sleep(ms) {
      tasks.push(["sleep", ms]);
      return this;
    },
    sleepFirst(ms) {
      tasks.unshift(["sleep", ms]);
      return this;
    },
    eat(food) {
      tasks.push(["eat", food]);
      return this;
    },
  };
}

LazyMan("Jack", console.log).eat("banana").sleep(10).eat("apple").sleep(1);
