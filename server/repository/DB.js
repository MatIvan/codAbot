//@ts-check
import RepoUser from './RepoUser.js'
import RepoBot from './RepoBot.js'
import RepoScript from './RepoScript.js'

// x, y, type
const blocks = [
    [0, 0, 1],
    [10, 10, 1],
];

function getBlocks() {
    return blocks;
}

export default {
    getBlocks,
    users: RepoUser,
    bots: RepoBot,
    scripts: RepoScript,
}
