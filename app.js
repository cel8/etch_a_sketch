// DOM objects

const eraser = document.querySelector('#eraser-checkbox');
const rainbowBrush = document.querySelector('#rainbow-checkbox');
const brushColorSelector = document.querySelector('#brush-selector');
const eraserColorSelector = document.querySelector('#eraser-selector');
const sketchContainer = document.querySelector(".sketch-container");
const gridSizeSlider = document.querySelector('#grid-size');
const gridSizeSliderOutput = document.querySelector('.grid-size-output');
const clearViewBtn = document.querySelector("#erase-all");

// Boolean state to allow painting/erasing 

let allowPainting = false;

// Add event listeners

gridSizeSlider.addEventListener('input', updateSliderOutput);
gridSizeSlider.addEventListener('mousemove', updateSliderOutput);
gridSizeSlider.addEventListener('change', updateGrid);
sketchContainer.addEventListener('mouseenter', disablePainting);
sketchContainer.addEventListener('mouseleave', disablePainting);
clearViewBtn.addEventListener('click', editAllChildren);
eraser.addEventListener('change', eraserChecked);
rainbowBrush.addEventListener('change', rainbowChecked);
window.addEventListener('load', initialize);

// Event functions 

function disablePainting() {
  allowPainting = false;
}

function onPaintEvent(event) {
  if((event.type === 'mouseover') && (allowPainting)) {
    event.target.style.backgroundColor = chooseBrush();
  }
}

function startPainting(event) {
  allowPainting = true;
  event.preventDefault();
  event.target.style.backgroundColor = chooseBrush();
}

function updateGrid() {
  buildSketch(gridSizeSlider.value);
}

function updateSliderOutput() {
  gridSizeSliderOutput.textContent = `Grid size: ${gridSizeSlider.value} x ${gridSizeSlider.value}`;
}

function eraserChecked() {
  if(eraser.checked) {
    if(rainbowBrush.checked) {
      rainbowBrush.checked = false;
    }
  }
}

function rainbowChecked() {
  if(rainbowBrush.checked) {
    if(eraser.checked) {
      eraser.checked = false;
    }
  }
}

// paint management 

function getRandomColor() {
  const max = 256;
  return Math.floor(Math.random() * max);
}

function selectEraserBrush() {
  return eraserColorSelector.value;
}

function chooseBrush() {
  let style;
  // Choose brush: choose eraser color when eraser is on, otherwise brush color or rainbow
  if(eraser.checked) {
    style = eraserColorSelector.value; 
  } else if(rainbowBrush.checked) {
    const r = getRandomColor();
    const g = getRandomColor();
    const b = getRandomColor();
    style = `rgb(${r}, ${g}, ${b})`;
  } else {
    style = brushColorSelector.value;
  }
  return style;
}

// grid management 

function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createChildren(parent, gridSize) {
  for(let i = 0; i < gridSize * gridSize; ++i) {
    let divElement = document.createElement('div');
    divElement.classList.toggle("sketch-item");
    divElement.addEventListener('mouseover', onPaintEvent);
    divElement.addEventListener('mouseup', disablePainting);
    divElement.addEventListener('mousedown', (e) => startPainting(e));
    parent.appendChild(divElement);
  }
}

function editAllChildren() {
  let element = sketchContainer.firstChild;
  while(element) {
    element.style.backgroundColor = selectEraserBrush();
    element = element.nextSibling;
  }
}

function buildSketch(gridSize) {
  sketchContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  removeAllChildNodes(sketchContainer);
  createChildren(sketchContainer, gridSize);
}

// Default value 

function initialize() {
  updateSliderOutput();
  buildSketch(gridSizeSlider.value);
}
