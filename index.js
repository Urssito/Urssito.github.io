const canvas = document.getElementById("board");
const bg = document.querySelector("img");
const context = canvas.getContext("2d");
const areas = document.getElementById("areas")

let initialX;
let initialY;

bg.addEventListener("load",() => {
    canvas.setAttribute("width", bg.offsetWidth);
    canvas.setAttribute("height", bg.offsetHeight);
})

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
    const data = context
        .getImageData(0,0,canvas.width, canvas.height)
        .data;
    
    const pixels = data.length / 4;
    let transparent = 0;

    for(let i = 3; i < data.length; i+=4){
        transparent += data[i] ? 0 : 1;
    }
    const percentage = transparent / pixels * 100;
    console.log(percentage+"%")
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