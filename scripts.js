const myRange = document.querySelector("#myRange");
const sliderOutput = document.querySelector(".firstOutput");
const sliderOutputTwo = document.querySelector(".secondOutput");
sliderOutput.innerHTML = myRange.value;
sliderOutputTwo.innerHTML = myRange.value;

myRange.oninput = function() {
    sliderOutput.innerHTML = myRange.value;
    sliderOutputTwo.innerHTML = myRange.value;
}