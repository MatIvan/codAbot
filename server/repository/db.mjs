//@ts-check

/**
 * @typedef {'admin' | 'user'} Role
 */

/**
 * @typedef {object} UserEntity
 * @property {number} id
 * @property {string} name
 * @property {Role[]} roles
 * @property {string} login
 * @property {string} secret
 */

// x, y, type
const blocks = [
    [0, 0, 1],
    [10, 10, 1],
];

/**
 * @returns {UserEntity[]}
 */
function getUsers() {
    return [{
        id: 0,
        name: 'Admin',
        login: 'Admin',
        secret: 'ShM8aMSINCMqHWP/VpzIECEBciwx4UH4mGVgIozZefs=',//admin
        roles: ['admin', 'user'],
    }, {
        id: 1,
        name: 'Ivan',
        login: 'Mativ',
        secret: 'iUqH548ViqxxoDegt5D0d43Qa/SYzXrU2Pu44lMz7AQ=',//123
        roles: ['user'],
    }]
}

/**
 * @param {string} login
 */
function getUserByLogin(login) {
    return getUsers().find((userEntity) => {
        return (login === userEntity.login);
    });
}

function getBlocks() {
    return blocks;
}

export {
    getBlocks,
    getUsers,
    getUserByLogin,
}