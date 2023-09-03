//@ts-check
///<reference path='../Types.js'/>

import GameApi from "./api/GameApi";
import Engine from "../engine/Engine";

const UPDATE_MS = 300;
let timer;

/** @type {WorldState} */
let lastState = {
    status: "STOP",
    tick: -1
}

function updatingStart() {
    Engine.show();
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
    Engine.hide();
}

function update() {
    GameApi.status()
        .then((worldState) => {
            console.log('GameStatus: ', worldState);
            processSatus(worldState);
        });
}

/**
 * @param {WorldState} worldState
*/
function processSatus(worldState) {
    const { tick, status } = lastState;
    lastState = worldState;

    if (worldState.status === 'START') {
        if (tick < worldState.tick) {
            GameApi.world().then(world => { Engine.tick(world) });
        }

    } else if (worldState.status === 'STOP') {
        if (status === 'START') {
            Engine.tick(null);
        }
    }

}
const GameService = {
    updatingStart,
    updatingStop
};
export default GameService;
