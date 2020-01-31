// DOM Elements
var canvas = document.getElementById("canvas");
const toggleToolboxBtn = document.querySelector(".toggle-toolbox-btn");
const toolbox = document.querySelector(".toolbox");
const btBtns = document.querySelectorAll(".bt-btn");
const bsBtns = document.querySelectorAll(".bs-btn");
const cBtns = document.querySelectorAll(".c-btn");

// Variables
let mousePressed = false;
let isToolboxToggled = false;
let brushType = "round";
let brushSize = 4;
let color = "#000";

// Canvas Settings
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Get mouse coordinates
const getMouseCoordinates = (c, e) => {
  let rect = c.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};

canvas.addEventListener("mousemove", e => {
  let mousePos = getMouseCoordinates(canvas, e);
  draw(mousePos.x, mousePos.y);
});

// Mouse Pressed
canvas.addEventListener("mousedown", e => {
  if (e.button === 0) {
    mousePressed = true;
    draw(e.clientX, e.clientY - 60);
  }
});

// Mouse Not Pressed
canvas.addEventListener("mouseup", e => {
  if (e.button === 0) {
    mousePressed = false;
    ctx.beginPath();
  }
});

// Draw
const draw = (x, y) => {
  if (mousePressed) {
    ctx.lineWidth = brushSize;
    ctx.lineCap = brushType;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
};

// Toggle Toolbox
const toggleToolbox = () => {
  if (!isToolboxToggled) {
    isToolboxToggled = true;
    toolbox.className = "toolbox toggled box-shadow";
    toggleToolboxBtn.className = "toggle-toolbox-btn toggled box-shadow";
  } else {
    isToolboxToggled = false;
    toolbox.className = "toolbox box-shadow";
    toggleToolboxBtn.className = "toggle-toolbox-btn box-shadow";
  }
};

// Select Brush Type
const selectBrushType = el => {
  brushType = el.dataset.brushType;
  el.className = "toolbox-btn bt-btn bt-selected";
  btBtns.forEach(btn => {
    if (btn.dataset.brushType !== brushType) {
      btn.className = "toolbox-btn bt-btn";
    } else {
      btn.className = "toolbox-btn bt-btn bt-selected";
    }
  });

  if (el.dataset.brushType === "eraser") {
    color = "#fff";
  }
};

// Select Brush Size
const selectBrushSize = el => {
  brushSize = el.dataset.brushSize;
  el.className = "toolbox-btn bs-btn bs-selected";
  bsBtns.forEach(btn => {
    if (btn.dataset.brushSize !== brushSize) {
      btn.className = "toolbox-btn bs-btn";
    } else {
      btn.className = "toolbox-btn bs-btn bs-selected";
    }
  });
};

// Select Color
const selectColor = el => {
  color = el.dataset.color;
  el.className = "toolbox-btn c-btn c-selected";
  cBtns.forEach(btn => {
    if (btn.dataset.color !== color) {
      btn.className = "toolbox-btn c-btn";
    } else {
      btn.className = "toolbox-btn c-btn c-selected";
    }
  });
};

// Clear Canvas
const clearCanvas = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
