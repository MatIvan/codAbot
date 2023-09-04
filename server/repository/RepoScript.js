//@ts-check

/**
 * @returns {Script[]}
 */
function getAll() {
    return [{
        id: 0,
        name: 'script-0',
        userId: 0,
        body: "demo0"
    }, {
        id: 1,
        name: 'script-1',
        userId: 0,
        body: "demo1"
    }]
}

/**
 * @param {number} id
 */
function getById(id) {
    return getAll().find((script) => {
        return (id === script.id);
    });
}

/**
 * @param {number} userId
 */
function getByUser(userId) {
    return getAll().filter((script) => {
        return (userId === script.userId);
    });
}

export default {
    getById,
    getByUser,
};
