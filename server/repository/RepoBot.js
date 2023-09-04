//@ts-check

/**
 * @returns {Bot[]}
 */
function getAll() {
    return [{
        id: 0,
        name: 'bot-0',
        scriptId: null,
        userId: 0,
    }, {
        id: 1,
        name: 'bot-1',
        scriptId: 0,
        userId: 0,
    }]
}

/**
 * @param {number} userId
 */
function getByUser(userId) {
    return getAll().filter((bot) => {
        return (userId === bot.userId);
    });
}

export default {
    getAll,
    getByUser
}
