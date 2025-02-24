/**
 * 定时器
 */
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
          item.extTime = curTime + item.delay; // 下次执行时间
          item.dealTime = curTime; // 此次执行时间
        }
      }
    }
  }
}

let timer = new Timer();

function now() {
  return Date.now();
}

let _timerIntervalKey = 0;

function startTick() {
  console.log(`11111 timer startTick: ${_timerIntervalKey}`);
  clearInterval(_timerIntervalKey);
  window.requestAnimationFrame(loop);
}

function loop(time) {
  timer.tick();
  window.requestAnimationFrame(loop);
}

function clearTick() {
  console.log(`11111 timer clearTick: ${_timerIntervalKey}`);
  clearInterval(_timerIntervalKey);
  _timerIntervalKey = 0;
  timer.timerList.length = 0;
}

module.exports = {
  timer, startTick, clearTick
};