import pino from 'pino';
import pretty from 'pino-pretty';

export const createLogger = (context?: { [key: string]: any; }) => {
    return pino({
        level: process.env.LOG_LEVEL || 'info',
        base: context || null,
    }, pretty({
     colorize: true,
    }))
}

export const logger = createLogger()
