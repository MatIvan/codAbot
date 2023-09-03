//@ts-check
///<reference path='../Types.js'/>

const CELL_SIZE = 8;

/** @type {HTMLCanvasElement | null} */
let canva = null;

/** @type {CanvasRenderingContext2D | null} */
let ctx = null;

function show() {
    canva = ctx = null;
    // @ts-ignore
    canva = document.getElementById('game-filed');
    if (!canva) return;
    ctx = canva.getContext("2d");

    // prepare world
    canva.width = 30 * CELL_SIZE;
    canva.height = 30 * CELL_SIZE;
}

function hide() {
    canva = ctx = null;
}

function clean() {
    if (!canva || !ctx) return;
    ctx.clearRect(0, 0, canva.width, canva.height);
}

/* *
 * @param {WorldState} world 
 */
function drawWorld(world) {
    clean();
    if (!ctx) return;

    world.map((rowArr, row) => {
        rowArr.map((value, col) => {
            if (value === 1) {
                if (ctx) {
                    ctx.fillRect(row * CELL_SIZE, col * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        })
    })
}

const View = {
    show,
    hide,
    clean,
    drawWorld
}
export default View;