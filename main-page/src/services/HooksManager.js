//@ts-check
const hooksMap = {};

/**
 * @param {Function} hook
 */
function wrap(hook) {
    return (/** @type {any} */ value) => {
        hook && hook(value);
    };
}

/**
 * @param {string} name
 * @param {Function} hook
 */
function setHook(name, hook) {
    hooksMap[name] = wrap(hook);
}

/**
 * @param {string} name
 * @param {any} value
 */
function fire(name, value) {
    hooksMap[name] && hooksMap[name](value);
}

export default {
    setHook,
    fire
};
