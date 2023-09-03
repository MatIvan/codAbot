//@ts-check
import ApiTool from './ApiTool';
import * as TYPE from './ApiObjects';

/**
 * @returns {Promise<TYPE.WorldState>}
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
