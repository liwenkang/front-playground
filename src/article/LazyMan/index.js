class _LazyMan {
  constructor(name) {
    this.taskList = [];
    this.sayName(name);

    setTimeout(async () => {
      for (let task of this.taskList) {
        await task();
      }
    });
  }

  sayName(name) {
    this.taskList.push(() => {
      console.log(`Hi! I am ${name}`);
    });
    return this;
  }

  eat(food) {
    this.taskList.push(() => {
      console.log(`eat ${food}`);
    });
    return this;
  }

  sleep(time) {
    this.taskList.push(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${time}s`);
          resolve();
        }, time * 1000);
      });
    });
    return this;
  }

  sleepFirst(time) {
    this.taskList.unshift(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${time}s`);
          resolve();
        }, time * 1000);
      });
    });
    return this;
  }
}

const LazyMan = (name) => new _LazyMan(name);
LazyMan("Hank").sleepFirst(3).eat("dinner").sleep(3).eat("supper");

// 输出:
// //等待2秒..
// Wake up after 2
// Hi This is Hank!
// Eat dinner~
// //等待3秒..
// Wake up after 2
// Eat supper~

// 以此类推
