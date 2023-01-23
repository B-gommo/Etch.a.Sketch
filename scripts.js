// slider values and grid creation
const myRange = document.querySelector("#myRange");
const sliderOutput = document.querySelector(".firstOutput");
const sliderOutputTwo = document.querySelector(".secondOutput");
sliderOutput.innerHTML = myRange.value;
sliderOutputTwo.innerHTML = myRange.value;

const canvas = document.getElementById("canvas");

function fillGrid() {
    const gridResult = `${myRange.value}` * `${myRange.value}`
    for (let gridLines = 1; gridLines<gridResult; gridLines++) {
        console.log(`${myRange.value}`);
        const cell = document.createElement("div");
        canvas.appendChild(cell);
    }
}

fillGrid();


canvas.style.cssText = `display: grid; grid-template: repeat(${myRange.value},1fr)/repeat(${myRange.value},1fr)`;

myRange.oninput = function () {
    sliderOutput.innerHTML = myRange.value;
    sliderOutputTwo.innerHTML = myRange.value;
    canvas.style.gridTemplate = `repeat(${myRange.value},1fr)/repeat(${myRange.value},1fr)`;
}


