
function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createChildren(parent, gridSize) {
  for(let i = 0; i < gridSize * gridSize; ++i) {
    let divElement = document.createElement('div');
    divElement.classList.toggle("sketch-item");
    divElement.addEventListener('click', (e) => {

      e.target.style = eraser ? "background-color: white" : "background-color: black";
    });
    parent.appendChild(divElement);
  }
}

function buildSketch(gridSize) {
  const sketchContainer = document.querySelector(".sketch-container");
  sketchContainer.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
  sketchContainer.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";
  removeAllChildNodes(sketchContainer);
  createChildren(sketchContainer, gridSize);
}

const array_size = [ 1, 5, 10, 64 ];
let index = 0;

let eraser = false;

document.querySelector("#gridSize").addEventListener('click', () => {
  buildSketch(array_size[index]);
  index = (index + 1) % array_size.length;
});

document.querySelector("#toggleEraser").addEventListener('click', () => {
  eraser = !eraser;
})

