//@ts-check
import DB from '../repository/DB.js';
import Logger from '../libs/log.js';
const log = Logger.getLogger('GAME');

const TICK_TIMER_MS = 1000;
const WORL_SIZE = 30;

/**
 * @typedef {object} WorldState
 * @property  {'STOP' | 'START'} status
 * @property  {number} tick
 */

/**
* @type WorldState
*/
const state = {
    status: 'STOP',
    tick: 0
}

const world = [];
clearWorld();

var timeoutID;

function loadWorld() {
    log.info('loadWorld');
    clearWorld();
    DB.getBlocks().map(([x, y, type]) => {
        world[x][y] = type;
    })
}

function clearWorld() {
    log.info('clearWorld');
    for (let i = 0; i < WORL_SIZE; i++) {
        world[i] = [];
        for (let j = 0; j < WORL_SIZE; j++) {
            world[i][j] = 0;
        }
    }
}

function start() {
    if (state.status === 'START') {
        throw new Error('Game allready started.');
    }
    log.info('start');
    loadWorld();
    state.tick = 0;
    state.status = 'START';
    timeoutID = setInterval(tick, TICK_TIMER_MS);
}

function stop() {
    log.info('stop');
    clearInterval(timeoutID);
    clearWorld();
    state.tick = 0;
    state.status = 'STOP';
}

function tick() {
    state.tick++;
    //log.info('tick: ' + state.tick);
}

export default {
    start,
    stop,
    status: () => state,
    getWorld: () => world,
}
