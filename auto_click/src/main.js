// main.js
utools.onPluginEnter(({ code, type, payload, option }) => {
  console.log("用户进入插件应用: ", `${code}, ${type}, ${payload}, ${option}`);
  resetAutoClick();
});

const pointList = [];

const btnStart = document.querySelector("#btnStart");
btnStart.onclick = function (e) {
  const inputTime1 = document.querySelector("#inputTime1");
  const time = inputTime1.value;
  const inputTime2 = document.querySelector("#inputTime2");
  const cnt = inputTime2.value;
  if (!pointList.length) {
    return;
  }
  window.main(time, cnt);
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
    utools.showNotification("清除最后一个位置成功！");
  }
};

function addPoint(hex, point) {
  const spanEle = document.querySelector("#pointInfo");
  const inputEle = document.createElement("input");
  inputEle.className = `col-8`;
  inputEle.type = "text";
  inputEle.value = `${pointList.length}: ` + ("hex: " + hex).padEnd(15, " ") + `point: { x:${point.x}, y:${point.y} }`;
  spanEle.appendChild(inputEle);
  pointList.push(point);
}
