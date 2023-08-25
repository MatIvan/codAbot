//@ts-check
import HooksManager from './HooksManager';

/**
 * @typedef {'user' | 'admin'} Role
 * @typedef {'HOME' | 'ADMIN' | 'GAME'} Page
 */

/**
 * @type { Map<Page, Role[]>}
 */
const map = new Map();
map.set('HOME', ['admin', 'user']);
map.set('ADMIN', ['admin']);
map.set('GAME', ['admin', 'user']);

/**
 * @param {Role[]} roles
 * @returns {Page[]}
 */
function getPages(roles) {
    if (!roles || roles.length === 0) {
        return ['HOME'];
    }
    const pages = roles
        .flatMap(role => getPagesByRole(role))
        .filter(onlyUnique);
    return pages;
}

/**
 * @param {Page} value
 * @param {number} index
 * @param {Page[]} array
 */
function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

/**
 * @param {Role} role
 */
function getPagesByRole(role) {
    let result = [];
    map.forEach((mapRoles, page) => {
        if (mapRoles.indexOf(role) >= 0) {
            result.push(page);
        }
    });
    return result;
}

/**
 * @param {Page} page
 */
function onPage(page) {
    HooksManager.fire('navigator.page', page);
}

export default {
    getPages,
    onPage,
}
