var canvasElem;
var socket;

$(document).ready(() => {
  canvasElem = document.querySelector("#place");
  socket = io();

  var canvas = $("#place")[0];
  var ctx = canvas.getContext("2d");

  socket.on("canvas", canvasData => {
    canvasData.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        ctx.fillStyle = col;
        ctx.fillRect(colIndex * 10, rowIndex * 10, 10, 10);
      });
    });
  });

  canvasElem.addEventListener("mousedown", function (e) {
    var cellWidth = 10; // Adjust based on your grid size
    var cellHeight = 10; // Adjust based on your grid size
    var mousePosition = getMousePosition(canvasElem, e, cellWidth, cellHeight);
    socket.emit("color", {
      col: mousePosition.x,
      row: mousePosition.y,
      color: $("#color").val(),
    });
  });
  
});

function getMousePosition(canvas, event, cellWidth, cellHeight) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  // Round to the nearest grid cell
  // cols = 500 / cell
  x = Math.round(x / cellWidth)
  y = Math.round(y / cellHeight)
  console.log(x,y)
  return { x: x, y: y };
}

