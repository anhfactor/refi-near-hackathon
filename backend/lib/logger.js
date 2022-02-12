const pino = require('pino')

let logger = null

module.exports = {
    getLogger(config = {}) {
        if (!logger) {
            logger = pino({
                level: config.LOG_LEVEL || process.env.LOG_LEVEL || "info",
                transport: {
                    target: 'pino-pretty',
                    options: {
                        levelFirst: true,
                        colorize: true,
                    }
                },
            })
        }
        return logger
    }
}