const canvas = document.getElementById("board");
const bg = document.getElementById("bg-map");
const context = canvas.getContext("2d");

let initialX;
let initialY;
const size = document.body.scrollHeight/1.2;
const bgW = bg.offsetWidth;
const bgH = bg.offsetHeight;
canvas.setAttribute("width", bgW);
canvas.setAttribute("height", bgH);

const draw = (cursorX, cursorY) => {
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = 10;
    context.strokeStyle = "#000";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(cursorX, cursorY);
    context.stroke();

    initialX = cursorX;
    initialY = cursorY;
}

const mouseMoving = (e) => {
    draw(e.offsetX, e.offsetY);
}

canvas.addEventListener("mousedown", (e) => {
    initialX = e.offsetX;
    initialY = e.offsetY;
    draw(initialX, initialY);
    canvas.addEventListener("mousemove", mouseMoving);
});

document.addEventListener("mouseup", (e) => {
    canvas.removeEventListener("mousemove", mouseMoving);
})