import './style.css';

const CELL_SIZE = 8;

var stateElem;

/**
 * @type HTMLCanvasElement
 */
var canva;

onload = () => {
    stateElem = document.getElementById('gameStatus');
    canva = document.getElementById('worldCanva');
    canva.width = 30 * CELL_SIZE;
    canva.height = 30 * CELL_SIZE;
    start();
}

function start() {
    setInterval(update, 300);
}

function update() {
    fetch('/game/api/status', { method: 'POST' })
        .then(response => response.json())
        .then((worldState) => {
            stateElem.innerHTML = JSON.stringify(worldState, undefined, 2);;
        });
    fetch('/game/api/world', { method: 'POST' })
        .then(response => response.json())
        .then((world) => {
            drawWorld(world);
        });
}

function drawWorld(world) {
    let ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);
    world.map((rowArr, row) => {
        rowArr.map((value, col) => {
            if (value === 1) {
                ctx.fillRect(row * CELL_SIZE, col * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        })
    })
}
