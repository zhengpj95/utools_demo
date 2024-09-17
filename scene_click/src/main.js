const btn = document.querySelector("#btnClick");
btn.onclick = function (e) {
    const point = utools.getCursorScreenPoint();
    console.log(point.x, point.y);
    // utools.showNotification("copy success");
    // utools.hideMainWindow();
};
