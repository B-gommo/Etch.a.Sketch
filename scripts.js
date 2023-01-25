const myRange = document.querySelector("#myRange");
const sliderOutput = document.querySelector(".firstOutput");
const sliderOutputTwo = document.querySelector(".secondOutput");
sliderOutput.innerHTML = myRange.value;
sliderOutputTwo.innerHTML = myRange.value;

const canvas = document.getElementById("canvas");
canvas.style.cssText = `display: grid; grid-template: repeat(${myRange.value},1fr)/repeat(${myRange.value},1fr)`;

function fillGrid() {
    const gridResult = `${myRange.value}` * `${myRange.value}`
    for (let gridLines = 1; gridLines<=gridResult; gridLines++) {
        const cell = document.createElement("div");
        cell.addEventListener('mouseover', backgroundColor);
        cell.addEventListener('mousedown', backgroundColor);
        cell.setAttribute('draggable', 'false');
        canvas.appendChild(cell);
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function backgroundColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    else{
    e.target.style.backgroundColor = 'black';
    }
}

fillGrid();

function clearCanvas() {
    canvas.innerHTML ='';
}

canvas.style.cssText = `display: grid; grid-template: repeat(${myRange.value},1fr)/repeat(${myRange.value},1fr)`;

myRange.oninput = function () {
    clearCanvas();
    sliderOutput.innerHTML = myRange.value;
    sliderOutputTwo.innerHTML = myRange.value;
    canvas.style.gridTemplate = `repeat(${myRange.value},1fr)/repeat(${myRange.value},1fr)`;
    fillGrid();
}