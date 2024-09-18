function setCurTime() {
  const inputCurTime = document.getElementById("inputCurTime");
  inputCurTime.value = window.getCurTime();

  const nowTime = document.querySelector("#nowTime");
  nowTime.innerHTML = window.formatTime(window.getCurTime());
}

setCurTime();
setInterval(() => {
  setCurTime();
}, 1000);

async function copyContent(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
    showModel(1);
  } catch (err) {
    console.error("Failed to copy: ", err);
    showModel(0);
  }
}

// 复制按钮
const btnCopy = document.querySelector("#btnCopy");
btnCopy.onclick = function (e) {
  const inputCurTime = document.getElementById("inputCurTime");
  const value = inputCurTime.value;
  if (!value) {
    e.preventDefault();
    return;
  }
  copyContent(value).then(value1 => console.log(`Success to copy!`));
};

// 输入的时间戳转换
const inputTime1 = document.querySelector("#inputTime1");
const btnTransfer1 = document.querySelector("#btnTransfer1");
btnTransfer1.onclick = function (e) {
  const time1 = inputTime1.value;
  if (isNaN(time1) || !time1) {
    e.preventDefault();
    return;
  }
  const timeValueStr = (time1 + "").slice(0, 10);
  console.log(11111, time1, timeValueStr);
  const timeElement1 = document.querySelector("#time1");
  timeElement1.innerHTML = window.formatTime(timeValueStr);
};

const inputTime2 = document.querySelector("#inputTime2");
inputTime2.value = window.formatCurTime("YYYY-MM-DDTHH:mm:ss");

// 日历时间戳转换
const btnTransfer2 = document.querySelector("#btnTransfer2");
btnTransfer2.onclick = function (e) {
  const timeValue = inputTime2.value;
  if (!timeValue) {
    e.preventDefault();
    return;
  }
  const ary = timeValue.split("T");
  const days = ary[0].split("-");
  const times = ary[1].split(":");
  const date = new Date();
  date.setFullYear(days[0], days[1] - 1, days[2]);
  date.setHours(times[0], times[1], times[2] ?? 0);
  document.querySelector("#time2").innerHTML = (date.getTime() / 1000 >> 0) + "";
};


function showModel(type = 1) {
  const myModal = new bootstrap.Modal("#exampleModal", {
    keyboard: false
  });
  document.querySelector("#modelContent").innerHTML = type === 1 ? "复制成功" : "复制失败";
  myModal.show();
}
