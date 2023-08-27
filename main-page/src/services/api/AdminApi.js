//@ts-check
import ApiTool from './ApiTool';

/**
 * @typedef {object} WorldState
 * @property  {'STOP' | 'START'} status
 * @property  {number} tick
 */

/**
 * @returns {Promise<any>}
 */
function start() {
    return ApiTool.sendPost('/admin/api/start');
}

/**
 * @returns {Promise<any>}
 */
function stop() {
    return ApiTool.sendPost('/admin/api/stop');
}

/**
 * @returns {Promise<WorldState>}
 */
function status() {
    return ApiTool.sendPost('/admin/api/status');
}

const AdminApi = {
    start,
    stop,
    status
}
export default AdminApi;
