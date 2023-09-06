/**
 * @typedef {'admin' | 'user'} Role
 */

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} name
 * @property {Role[]} roles
 * @property {string} login
 * @property {string} secret
 */

/**
 * @typedef {object} Bot
 * @property {number} id
 * @property {string} name
 * @property {number} userId
 * @property {number | null} scriptId
 */

/**
 * @typedef {object} Script
 * @property {number} id
 * @property {string} name
 * @property {number} userId
 * @property {string} body
 */

/**
 * @typedef {object} ScriptInfo
 * @property {number} id
 * @property {string} name
 */
