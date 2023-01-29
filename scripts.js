let color = '#000000';

const myRange = document.querySelector("#myRange");
const sliderOutput = document.querySelector(".firstOutput");
const sliderOutputTwo = document.querySelector(".secondOutput");
sliderOutput.innerHTML = myRange.value;
sliderOutputTwo.innerHTML = myRange.value;

const canvas = document.getElementById("canvas");
canvas.style.cssText = `display: grid; grid-template: repeat(${myRange.value},1fr)/repeat(${myRange.value},1fr)`;

const colorWrapper = document.getElementById('color-wrapper');
const colorPicker = document.getElementById('color-picker');
const darkenBtn = document.getElementById('darkenBtn');
const lightenBtn = document.getElementById('lightenBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');

function fillGrid() {
    const gridResult = `${myRange.value}` * `${myRange.value}`
    for (let gridLines = 1; gridLines <= gridResult; gridLines++) {
        const cell = document.createElement("div");
        cell.dataset.percent = '100';
        cell.addEventListener('mouseover', backgroundColor);
        cell.addEventListener('mousedown', backgroundColor);
        canvas.appendChild(cell);
        canvas.style.cssText = `display: grid; grid-template: repeat(${myRange.value},1fr)/repeat(${myRange.value},1fr)`;
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function backgroundColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (mode === 'darken') {
        console.log(e.target.dataset.percent);
        let rbgPercent = parseInt(e.target.dataset.percent);
        if (rbgPercent >= 10) {
            rbgPercent -= 10;
            e.target.dataset.percent = rbgPercent;
        }
        let rgbColor = `rgb(${rbgPercent}%,${rbgPercent}%,${rbgPercent}%)`
        if (e.target !== canvas) {
            e.target.style['background'] = rgbColor;
        }
    } else if (mode === 'lighten') {
        let rbgPercent = parseInt(e.target.dataset.percent);
        if (rbgPercent === 100) { 
            return;
        } else if (rbgPercent >= 0) {
            rbgPercent += 10;
            e.target.dataset.percent = rbgPercent;
        }
        let rgbColor = `rgb(${rbgPercent}%,${rbgPercent}%,${rbgPercent}%)`
        if (e.target !== canvas) {
            e.target.style['background'] = rgbColor;
        }
    } else if (mode === 'rainbow'){
        changeColor();
        e.target.style.backgroundColor = color;
        rbgPercent = 60;
        e.target.dataset.percent = rbgPercent;
    } else {
        e.target.style.backgroundColor = color;
        rbgPercent = 60;
        e.target.dataset.percent = rbgPercent;
    }
}

fillGrid();

function getRandomColor(){
    let letters = '0123456789ABCDEF';
    let colors = '#';
    for (let i=0; i < 6; i++){
        colors += letters[Math.floor(Math.random() * 16)];
    }
    return colors;
}

function changeColor(){
    let newColor = getRandomColor();
    color = newColor;
}

function clearCanvas() {
    canvas.innerHTML = '';
}

myRange.oninput = function () {
    clearCanvas();
    sliderOutput.innerHTML = myRange.value;
    sliderOutputTwo.innerHTML = myRange.value;
    fillGrid();
}

let mode = 'draw';

colorPicker.onchange = e => {
    color = e.target.value;
    colorWrapper.style.backgroundColor = e.target.value;
    document.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
        mode = 'draw';
    })
}

darkenBtn.onclick = () => mode = 'darken';
lightenBtn.onclick = () => mode = 'lighten';
rainbowBtn.onclick = () => mode = 'rainbow';
eraserBtn.onclick = () => mode = 'eraser';
clearBtn.onclick = () => mode = 'clear';

let prevBtn = null;

const activeBtn = document.querySelectorAll('button');
activeBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.classList.add('active');
        if (prevBtn !== null && prevBtn !== e.target) {
            prevBtn.classList.remove('active');
        }
        if (mode === 'darken') {
            prevBtn = darkenBtn
        } else if (mode === 'lighten') {
            prevBtn = lightenBtn
        } else if (mode === 'rainbow') {
            prevBtn = rainbowBtn
        } else if (mode === 'eraser') {
            prevBtn = eraserBtn
            color = 'white';
        } else if (mode === 'clear') {
            clearCanvas();
            fillGrid();
            prevBtn = clearBtn
        }
    })
})