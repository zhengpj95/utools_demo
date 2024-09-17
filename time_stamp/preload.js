const dayjs = require("dayjs");
const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss"

window.formatCurTime = function (formatStr = DEFAULT_FORMAT) {
  const date = dayjs();
  return date.format(formatStr)
}

window.formatTime = function (time) {
  const date = dayjs.unix(time);
  return date.format(DEFAULT_FORMAT);
};

window.getCurTime = function () {
  return dayjs().unix() ?? 0;
};
