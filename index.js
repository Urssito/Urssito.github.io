const canvas = document.getElementById("board");
const bg = document.querySelector("img");
const context = canvas.getContext("2d");
const areas = document.getElementById("areas")

let initialX;
let initialY;

bg.addEventListener("load",() => {
    canvas.setAttribute("width", bg.offsetWidth);
    canvas.setAttribute("height", bg.offsetHeight);
    let base = new Image();
    base.src = "/files/forest.png";
    base.onload = () => {
        context.drawImage(base, 0, 0);
    }
})

const draw = (cursorX, cursorY) => {
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = 20;
    context.strokeStyle = "#000";
    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(cursorX, cursorY);
    context.stroke();

    initialX = cursorX;
    initialY = cursorY;
}

const mouseMoving = (e) => {
    draw(e.offsetX, e.offsetY);
    const data = context
        .getImageData(0,0,canvas.width, canvas.height)
        .data;
    
    const pixels = data.length / 4;
    let transparent = 0;

    for(let i = 3; i < data.length; i+=4){
        transparent += data[i] ? 0 : 1;
    }
    const percentage = transparent / pixels * 100;
    const text = document.getElementById("percentage");
    text.innerHTML = percentage.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] + "%";
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

document.addEventListener("mousemove", (e) => {
})