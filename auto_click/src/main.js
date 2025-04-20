// main.js

/**
 * @type {{x: number, y: number}[]}
 */
const pointList = [];

const btnStart = document.querySelector("#btnStart");
btnStart.onclick = function (e) {
  const inputTime1 = document.querySelector("#inputTime1");
  const time = inputTime1.value;
  const inputTime2 = document.querySelector("#inputTime2");
  const cnt = inputTime2.value;
  if (!pointList.length) {
    showModelData(`没有获取位置，无法开启，请先获取坐标位置信息!`);
    return;
  }
  window.mainFunc(time, cnt);
};

const btnGetPoint = document.querySelector("#btnGetPoint");
btnGetPoint.onclick = function (e) {
  window.getScenePoint(addPoint);
};

const btnClearPoint = document.querySelector("#btnClearPoint");
btnClearPoint.onclick = function (e) {
  const spanEle = document.querySelector("#pointInfo");
  if (spanEle?.lastChild) {
    spanEle.removeChild(spanEle.lastChild);
    pointList.pop();
    showModelData("清除最后一个位置成功！");
  }
};

/**
 * 添加坐标点
 * @param {string} hex
 * @param {{x: number, y: number}} point
 * @returns {void}
 */
function addPoint(hex, point) {
  const spanEle = document.querySelector("#pointInfo");
  const inputEle = document.createElement("input");
  inputEle.className = `col-8`;
  inputEle.type = "text";
  inputEle.value = `${pointList.length}: ` + `point: { x: ${point.x}, y: ${point.y} }`;
  spanEle.appendChild(inputEle);
  pointList.push(point);
}

/**
 * @param {string} text
 * @returns {void}
 */
function showModelData(text) {
  const myModal = new bootstrap.Modal("#exampleModal", {
    keyboard: false
  });
  document.querySelector("#modelContent").innerHTML = text;
  myModal.show();
}
