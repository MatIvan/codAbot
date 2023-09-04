//@ts-check

/**
 * @typedef {object} LoggerOptions
 * @property {string} [fileName]
 * @property {string} loggerName
 * @property {boolean} [needConlose]
 * @property {LogLevel} [level]
 */

/**
 * @typedef {'debug' | 'info' | 'error'} LogLevel
*/
const Levels = { 'debug': 0, 'info': 1, 'error': 2 };

/**
 * @type LoggerOptions
 */
const DEFOULT_OPTONS = {
    loggerName: 'MAIN',
    fileName: 'codabot.log',
    needConlose: true,
    level: 'debug',
}

/**
 * @param {LoggerOptions | string} loggerOptions
 * @returns {Logger}
 */
function getLogger(loggerOptions) {
    let opt = DEFOULT_OPTONS;
    if (typeof loggerOptions == 'string') {
        opt.loggerName = loggerOptions;
    } else {
        opt = {
            ...
            loggerOptions
        }
    }
    return new Logger(opt);
}

class Logger {
    /**
     * @param {LoggerOptions} options
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * @param {LogLevel} level
     * @param {any[]} data
     */
    log(level, ...data) {
        const loggerLevel = Levels[this.options.level];
        if (Levels[level] < loggerLevel) {
            return;
        }
        var today = new Date();
        const prefix = today.toLocaleString('ru-RU') + " : "
            + level + " : "
            + this.options.loggerName + " : ";

        if (this.options.needConlose) {
            console[level](prefix, ...data);
        }
        //TODO log to file
    }

    /**
     * @param {any[]} data
     */
    info(...data) {
        this.log('info', ...data);
    }

    /**
     * @param {any[]} data
     */
    debug(...data) {
        this.log('debug', ...data);
    }

    /**
     * @param {any[]} data
     */
    error(...data) {
        this.log('error', ...data);
    }
}

export default {
    getLogger,
};
