//@ts-check

/**
 * @returns {User[]}
 */
function getAll() {
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
function getByLogin(login) {
    return getAll().find((userEntity) => {
        return (login === userEntity.login);
    });
}

export default {
    getAll,
    getByLogin
};
