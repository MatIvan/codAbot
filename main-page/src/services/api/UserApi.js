//@ts-check
///<reference path='../../Types.js'/>

import ApiTool from './ApiTool';

/**
 * @returns {Promise<User>}
 */
function getAll() {
    return ApiTool.sendGet('/users');
}

const AdminApi = {
    getAll,
}
export default AdminApi;
