utools.onPluginEnter(({ code, type, payload, option }) => {
  console.log("用户进入插件应用", code, type, payload, option);
  console.log(isClickAdd, isStart);
  isClickAdd = false;
  isStart = false;
  clearInterval(intervalKey);
});

utools.onPluginOut((processExit) => {
  if (processExit) {
    console.log("插件应用完全退出");
  } else {
    console.log("插件应用隐藏后台");
  }
});

document.onkeydown = function (event) {
  if (event.ctrlKey && event.altKey && event.key === "z") {
    if (isClickAdd) {
      console.log("按下了CTRL+ALT+Z");
      let point = utools.getCursorScreenPoint();
      console.log("add point: ", point);
      addPoint(point);
    }
  }
  if (event.ctrlKey && event.altKey && event.key === "x") {
    if (isStart) {
      console.log(`stop auto click`);
      clearInterval(intervalKey);
      utools.showNotification("停止运行");
    }
  }
};

let isClickAdd = false;
const btn = document.querySelector("#btnClickAdd");
btn.onclick = function (e) {
  isClickAdd = !isClickAdd;
  btn.textContent = !isClickAdd ? "添加位置" : "停止添加";
};

let pointIdx = 0;
let pointMap = new Map();

function addPoint(point) {
  pointIdx++;
  const list = document.querySelector("#listGroup");
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `坐标点：x=${point.x}, y=${point.y}`;
  li.value = pointIdx;
  pointMap[pointIdx] = point;
  list.appendChild(li);
}

let isStart = false;
const btnStart = document.querySelector("#btnClickStart");
btnStart.onclick = function (e) {
  isClickAdd = false;
  isStart = true;
  btn.textContent = "添加位置";
  utools.showNotification("开始运行");
  startClickInterval();
};

let clickIdx = -1;
let intervalKey = 0;
let totalClickCnt = 10;
let clickCnt = 0;

function startClickInterval() {
  clickCnt = 1;
  intervalKey = setInterval(() => {
    startClick();
  }, 2000);
  utools.hideMainWindow();
}

function startClick() {
  clickIdx++;
  const list = document.querySelector("#listGroup");
  if (clickIdx > list.childElementCount) {
    clickIdx = 0;
    clickCnt++;
    console.log(`11111 clickCnt:${clickCnt}`);
  }
  if (clickCnt > totalClickCnt) {
    console.log("progress end");
    clearInterval(intervalKey);
    return;
  }
  const ele = list.children[clickIdx];
  if (ele) {
    const value = ele.value;
    const point = pointMap[value];
    if (point) {
      console.log("click point: ", value, point);
      utools.simulateMouseClick(point.x, point.y);
    }
  }
}