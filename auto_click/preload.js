// preload.js

const timer = require("./src/timer.js");
const { getTimeFormat } = require("./src/utils");

let autoClickCnt = 10;
let interval = 0;
let intervalKey = 0;

function main(interval1, clickCnt1) {
  interval = +interval1;
  autoClickCnt = +clickCnt1;
  console.log(111112, Date.now(), "点击位置列表：", interval, autoClickCnt, pointList);
  startAutoByPointList();
}

function startAutoByPointList() {
  if (!pointList?.length) {
    utools.showNotification(`没有获取位置，无法开启!`);
    return;
  }
  utools.showNotification("开始自动点击!!!");
  console.log(getTimeFormat(), `开始自动点击!!!`);
  // startAutoInterval();
  startAutoIntervalTimer();
}

let pointIdx = 0;
let roundTime = 0;

function startAutoInterval() {
  clearInterval(intervalKey);
  pointIdx = 0;
  roundTime = 0;
  intervalKey = setInterval(() => {
    console.log(getTimeFormat(), pointIdx, interval);
    if (roundTime >= autoClickCnt) {
      clearInterval(intervalKey);
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
  }, interval);
}

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
  console.log("run addTick: ", getTimeFormat(), pointIdx, roundTime, elapsed);
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
  console.log("click: ", point.x, point.y);
  utools.simulateMouseClick(point.x, point.y);
}

function getScenePoint(func) {
  utools.screenColorPick(({ hex, rgb }) => {
    const point = utools.getCursorScreenPoint();
    console.log("位置信息：", hex, rgb, point); // #FFFFFF RGB(0, 0, 0)
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
