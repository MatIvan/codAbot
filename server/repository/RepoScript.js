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
    }, {
        id: 2,
        name: 'script-2',
        userId: 1,
        body: "demo2"
    }]
}

/**
 * @param {number} id
 * @returns {Script | undefined}
 */
function getById(id) {
    return getAll()
        .find((script) => {
            return (id === script.id);
        });
}

/**
 * @param {number} userId
 * @returns {Script[]}
 */
function getByUser(userId) {
    return getAll()
        .filter((script) => {
            return (userId === script.userId);
        });
}
const RepoScript = {
    getById,
    getByUser,
};
export default RepoScript;