// Problem Statement:-
// Picture having multiple asynchronous tasks that need to be run,
// But with a limit on how many can be executed at the same time.
// Once that limit is reached, any remaining tasks should wait in a queue
// And only start running after the active tasks have completed.

class AysncTaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.tasks = [];
    this.activeCount = 0;
  }

  async _runTask(task) {
    try {
      await task();
    } catch (error) {
      // ignore the rejection
    } finally {
      this.activeCount--;
      this._runNextTask();
    }
  }

  _runNextTask() {
    while (this.activeCount < this.concurrency && this.tasks.length > 0) {
      const nextTask = this.tasks.shift();
      this.activeCount++;
      this._runTask(nextTask);
    }
  }

  queue(task) {
    this.tasks.push(task);
    this._runNextTask();
  }
}

const runner = new AysncTaskQueue(3);

const task1 = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("Task 1 done");
      resolve();
    }, 1000)
  );
const task2 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Task 2 failed");
      reject();
    }, 2000)
  );
const task3 = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("Task 3 done");
      resolve();
    }, 3000)
  );
const task4 = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("Task 4 done");
      resolve();
    }, 4000)
  );
const task5 = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("Task 5 done");
      resolve();
    }, 8000)
  );
const task6 = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("Task 6 done");
      resolve();
    }, 5000)
  );

runner.queue(task1);
runner.queue(task2);
runner.queue(task3);
runner.queue(task4);
runner.queue(task5);
runner.queue(task6);
