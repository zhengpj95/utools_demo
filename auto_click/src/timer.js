const { getTimeFormat } = require("./utils");

class Timer {
  /**
   * @type {{ method:any, methodObj:any, delay:number, extTime:number, dealTime:number }[]}
   */
  timerList = [];

  add(func, funcThis, interval = 1000) {
    if (this.has(func, funcThis)) {
      const item = this.get(func, funcThis);
      if (item) {
        item[2] = interval;
        item[3] = now() + interval;
      }
      return;
    }
    const extTime = now() + interval; //执行时间
    this.timerList.push({
      method: func,
      methodObj: funcThis,
      delay: interval,
      extTime: extTime,
      dealTime: now()
    });
  }

  remove(func, funcThis) {
    for (let i = 0; i < this.timerList.length; i++) {
      const item = this.timerList[i];
      if (item.method === func && item.methodObj === funcThis) {
        this.timerList[i] = undefined;
        this.timerList.splice(i, 1);
        return;
      }
    }
  }

  get(func, funcThis) {
    for (let item of this.timerList) {
      if (item.method === func && item.methodObj === funcThis) {
        return item;
      }
    }
    return [];
  }

  has(func, funcThis, interval = 0) {
    for (let item of this.timerList) {
      if (item.method === func && item.methodObj === funcThis) {
        return true;
      }
    }
    return false;
  }

  tick() {
    const curTime = now();
    for (let item of this.timerList) {
      if (item && item.method) {
        if (item.extTime <= curTime) {
          item.method.call(item.methodObj, curTime - item.dealTime);
          console.log(`111112 `, getTimeFormat(), curTime, item);
          item.extTime = curTime + item.delay; // 下次执行时间
          item.dealTime = curTime; // 此次执行时间
        }
      }
    }
  }
}

function tick() {
  timer.tick();
}

function now() {
  return Date.now();
}

setInterval(tick, 0);

const timer = new Timer();
module.exports = timer;