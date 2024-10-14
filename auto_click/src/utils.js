const dayjs = require("dayjs");

function getTimeFormat() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss.SSS");
}

module.exports = {
  getTimeFormat
}