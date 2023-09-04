//@ts-check
import RepoUser from './RepoUser'
import RepoBot from './RepoBot'
import RepoScript from './RepoScript'

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
