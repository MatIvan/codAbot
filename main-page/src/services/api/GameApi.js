//@ts-check
///<reference path='../../Types.js'/>
import ApiTool from './ApiTool';

/**
 * @returns {Promise<WorldState>}
 */
function status() {
    return ApiTool.sendPost('/game/api/status');
}

function world() {
    return ApiTool.sendPost('/game/api/world');
}

const GameApi = {
    status,
    world
}
export default GameApi;
