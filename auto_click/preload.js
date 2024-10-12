// preload.js

const dayjs = require("dayjs");

let isAuto = 1;
let autoClickCnt = 10;
let confirmPoint = { x: 0, y: 0 };
let confirmHex = "";
let cancelPoint = { x: confirmPoint.x + 10, y: confirmPoint.y + 45 };
const stopHex = ["#1e1f22", "#1e1e1e", "#1f1f1f", "#1d1d1d", "#1c1c1c"];

function setCancelPoint(point) {
  cancelPoint = { x: point.x + 10, y: point.y + 45 };
}

function getSceneColor() {
  clearInterval(intervalKey);
  utools.screenColorPick(({ hex, rgb }) => {
    console.log(hex, rgb); // #FFFFFF RGB(0, 0, 0)
    const point = utools.getCursorScreenPoint();
    console.log(point);
    utools.showNotification(`获取鼠标位置信息，{x:${point.x},y:${point.y}}`);
    startAuto(hex, point);
  });
}

function startAuto(hex, point) {
  if (!hex || !point) {
    utools.showNotification("!!!无法开始自动点击!!!");
    return;
  }
  confirmHex = hex;
  confirmPoint = point;
  setCancelPoint(confirmPoint);
  autoInterval();
}

function clickCancel() {
  utools.simulateMouseMove(cancelPoint.x, cancelPoint.y);
  utools.simulateMouseClick(cancelPoint.x, cancelPoint.y);
  console.log(`11111 click cancel`);
  toggleFlag = false;
}

function clickConfirm() {
  utools.simulateMouseMove(confirmPoint.x, confirmPoint.y);
  utools.simulateMouseClick(confirmPoint.x, confirmPoint.y);
  console.log(`11111 click confirm`);
  toggleFlag = true;
}

function getTimeFormat() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")
}

let toggleFlag = false;
let interval = 0;
let intervalKey = 0;

function autoInterval() {
  toggleFlag = false;
  if (!isAuto) {
    return;
  }
  utools.showNotification("开始自动点击!!!");
  let time = 0;
  intervalKey = setInterval(() => {
    time++;
    if (time > autoClickCnt) {
      clearInterval(intervalKey);
      return;
    }
    console.log(getTimeFormat(), toggleFlag, time);
    if (toggleFlag) {
      clickCancel();
    } else {
      clickConfirm();
    }
  }, interval);
}

function main(interval1, clickCnt1) {
  interval = +interval1;
  autoClickCnt = +clickCnt1;
  console.log("点击位置列表：", interval, autoClickCnt, pointList);
  startAutoByPointList();
}

function startAutoByPointList() {
  if (!pointList?.length) {
    utools.showNotification(`没有获取位置，无法开启!`);
    return;
  }
  utools.showNotification("开始自动点击!!!");
  console.log(getTimeFormat(), `开始自动点击!!!`);
  startAutoInterval();
}

let pointIdx = 0;

function startAutoInterval() {
  clearInterval(intervalKey);
  let roundTime = 0;
  pointIdx = 0;
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

function setClick(point) {
  if (!point) {
    return;
  }
  // utools.simulateMouseMove(point.x, point.y);
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
