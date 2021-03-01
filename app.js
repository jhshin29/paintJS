'use strict'

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave")

const INITIAL_COLOR = '#000'
const CANVAS_SIZE = 700;

ctx.fillStyle = "#fff"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let paintingMode = true;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const lineRange = event.target.value
    ctx.lineWidth = lineRange
}

function fillColor() {
    if (!paintingMode) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

}

function changeMode() {
    if (paintingMode) {
        mode.innerText = "PAINTING"
        paintingMode = false;
    } else {
        mode.innerText = "FILL"
        paintingMode = true;
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = 'hi';
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillColor);
    canvas.addEventListener("contextmenu", handleCM)
}

colors.forEach(color =>
    color.addEventListener("click", handleColorClick)
);

range.addEventListener("input", handleRangeChange);

mode.addEventListener("click", changeMode)

saveBtn.addEventListener("click", handleSaveClick)