const canvas = document.getElementById("board");
const bg = document.querySelector("img");
const context = canvas.getContext("2d");
const areas = document.getElementById("areas")

let initialX;
let initialY;
fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: JSON.stringify({foo:bar})
  })
  .then(function (resp){
    return resp.json()
  })
  .then(function (data) {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });

bg.addEventListener("load",() => {
    console.log("xd")
    const canvaWidth = bg.offsetWidth * 0.92;
    canvas.setAttribute("width", canvaWidth);
    canvas.setAttribute("height", bg.offsetHeight);
    const borders = document.getElementById("borders");
    borders.style.width = canvaWidth + "px";
    borders.style.height = bg.offsetHeight + "px";
    let base = new Image();
    bg.crossOrigin = "anonymous";
    base.src = "files/forest.jpg";
    base.onload = () => {
        context.drawImage(base, 0, 0);
    }
})

const draw = (cursorX, cursorY) => {
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = 20;
    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(cursorX, cursorY);
    context.stroke();

    initialX = cursorX;
    initialY = cursorY;
}
let B = false;

const mouseMoving = (e) => {
    bg.crossOrigin = "anonymous";
    draw(e.offsetX, e.offsetY);
    const data = context
        .getImageData(0,0,canvas.width, canvas.height)
        .data;
    
    const pixels = data.length / 4;
    let transparent = 0;

    for(let i = 3; i < data.length; i+=4){
        transparent += data[i] ? 0 : 1;
    }
    const percentage = (transparent / pixels * 100)*1.3529;
    const perText = document.getElementById("percentage");
    const hectares = document.getElementById("remaining-hectares");
    const co2 = document.getElementById("CO2-emitted");
    const temperature = document.getElementById("Temperature-rise");

    if(percentage>93 && !B){
        alert("You have just deforested the total deforested in Santiago del Estero (93% approx.)")
        B = true;
    }

    if(percentage<100){
        perText.innerHTML = percentage.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] + "%";
        const hectaresNumber = parseInt(10792200 * ((100-percentage)/100),10);
        hectares.innerHTML = hectaresNumber;
        const co2Emission = (10792200 - hectaresNumber) * 0.00000209;
        co2.innerHTML = co2Emission.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] + "kg-2";
        const tRise = (10792200 - hectaresNumber) * 0.00000196043;
        temperature.innerHTML = tRise.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] + "K°";
    }else{
        perText.innerHTML = "100%";
        hectares.innerHTML = 0;
    }
}

canvas.addEventListener("mousedown", (e) => {
    initialX = e.offsetX;
    initialY = e.offsetY;
    draw(initialX, initialY);
    mouseMoving(e);
    canvas.addEventListener("mousemove", mouseMoving);
});

document.addEventListener("mouseup", (e) => {
    canvas.removeEventListener("mousemove", mouseMoving);
})

document.addEventListener("mousemove", (e) => {
})