// main.js

const pointList = [];

const btnStart = document.querySelector("#btnStart");
btnStart.onclick = function (e) {
  const inputTime1 = document.querySelector("#inputTime1");
  const time = inputTime1.value;
  const inputTime2 = document.querySelector("#inputTime2");
  const cnt = inputTime2.value;
  window.main(time, cnt);
};

const btnGetPoint = document.querySelector("#btnGetPoint");
btnGetPoint.onclick = function (e) {
  window.getScenePoint(addPoint);
};

function addPoint(hex, point) {
  const spanEle = document.querySelector("#pointInfo");
  const inputEle = document.createElement("input");
  inputEle.className = `col-8`;
  inputEle.type = "text";
  inputEle.value = ("hex: " + hex).padEnd(15, " ") + `point: { x:${point.x}, y:${point.y} }`;
  spanEle.appendChild(inputEle);
  pointList.push(point);
}
