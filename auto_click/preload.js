// preload.js

const { getTimeFormat } = require("./src/utils");
const { timer, clearTick, startTick } = require("./src/timer");

utools.onPluginEnter(({ code, type, payload, option }) => {
  console.log("用户进入插件应用: ", `${code}, ${type}, ${payload}, ${option}`);
  resetAutoClick();
  clearTick();
  startTick();
});


let autoClickCnt = 10;
let interval = 0;
let intervalKey = 0;

function main(interval1, clickCnt1) {
  interval = +interval1;
  autoClickCnt = +clickCnt1;
  startAutoByPointList();
}

function startAutoByPointList() {
  if (!pointList?.length) {
    utools.showNotification(`没有获取位置，无法开启!`);
    return;
  }
  utools.showNotification("开始自动点击!!!");
  console.log(getTimeFormat(), `开始自动点击!!!`);
  startAutoIntervalTimer();
}

let pointIdx = 0;
let roundTime = 0;

function startAutoIntervalTimer() {
  pointIdx = 0;
  roundTime = 0;
  timer.remove(addTick, undefined);
  timer.add(addTick, undefined, interval);
}

function addTick(elapsed) {
  if (roundTime >= autoClickCnt) {
    timer.remove(addTick, undefined);
    utools.showNotification("结束自动点击!!!");
    console.log(getTimeFormat(), `结束自动点击!!!`);
    return;
  }
  const point = pointList[pointIdx];
  setClick(point);
  pointIdx++;
  if (pointIdx >= pointList.length) {
    pointIdx = 0;
    roundTime++;
  }
}

function setClick(point) {
  if (!point) {
    return;
  }
  utools.simulateMouseClick(point.x, point.y);
}

function getScenePoint(func) {
  utools.screenColorPick(({ hex, rgb }) => {
    const point = utools.getCursorScreenPoint();
    func(hex, point);
  });
}

function resetAutoClick() {
  clearInterval(intervalKey);
  interval = 0;
  intervalKey = 0;
}

window.main = main;
window.getScenePoint = getScenePoint;
window.resetAutoClick = resetAutoClick;
