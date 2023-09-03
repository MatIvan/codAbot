//@ts-check
import GameApi from "./api/GameApi";

const CELL_SIZE = 8;
const UPDATE_MS = 1000;
let timer;

function updatingStart() {
    const canva = document.getElementById('game-filed');
    if (!canva) {
        return console.error('Have not canva !!!');
    }
    canva.width = 30 * CELL_SIZE;
    canva.height = 30 * CELL_SIZE;

    if (!timer) {
        console.log('GameService: updating started.');
        timer = setInterval(update, UPDATE_MS);
    } else {
        console.log('GameService: updating already started.');
    }
}

function updatingStop() {
    console.log('GameService: updating stoped.');
    clearInterval(timer);
    timer = null;
}

function update() {
    GameApi.status()
        .then((worldState) => {
            console.log('GameStatus: ', worldState);
        });
    GameApi.world()
        .then(world => { drawWorld(world) });
}

function drawWorld(world) {
    const canva = document.getElementById('game-filed');
    if (!canva) {
        return console.error('Have not canva !!!');
    }

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

const GameService = {
    updatingStart,
    updatingStop
};
export default GameService;