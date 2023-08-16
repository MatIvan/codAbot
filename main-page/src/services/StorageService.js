const TOKEN = 'token';
/**
 * @param {string} token
 */
function saveToken(token) {
    sessionStorage.setItem(TOKEN, token);
}

/**
 * @returns {string | null} token
 */
function getToken() {
    return sessionStorage.getItem(TOKEN);
}

function cleanToken() {
    return sessionStorage.removeItem(TOKEN);
}

export default {
    saveToken,
    getToken,
    cleanToken
}