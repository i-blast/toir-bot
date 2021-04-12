import path from 'path';
import config from 'config';
import { addColors, createLogger, format, transports } from 'winston';
import moment from 'moment';

const colors = {
    ERROR: 'red',
    WARN: 'yellow',
    INFO: 'green',
    DEBUG: 'gray',
};
addColors(colors);
const colorizer = format.colorize();

const consoleFormat = format.printf(({ level, timestamp, label, message, stack }) => {
    return `${colorizer.colorize(level, [timestamp, level].join(' '))}\t[${label}]: ${message} ${stack || ''}`;
});

const fileFormat = format.printf(({ level, timestamp, label, message, stack }) => {
    return `[${timestamp}] [${level}]\t[${label}]: ${message} ${stack || ''}`;
});

const templateFormat = format.combine(
    format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
    format.label({ label: `${config.get('toir-bot.service-name')}`.toUpperCase() }),
    format.errors({
        stack: true,
    }),
    format.timestamp({
        format: `${config.get('toir-bot.logger.message.timestamp-pattern')}`,
    }),
);

const toirBotLogger = createLogger({
    transports: [
        new transports.Console({
            level: `${config.get('toir-bot.logger.console.debug-level')}`,
            format: format.combine(templateFormat, consoleFormat),
        }),
        new transports.File({
            level: `${config.get('toir-bot.logger.file.debug-level')}`,
            filename: path.join(
                __dirname,
                `../../${config.get('toir-bot.logger.file.path.name')}`,
                `${moment(new Date()).format(config.get('toir-bot.logger.file.path.timestamp-pattern'))}.log`,
            ),
            format: format.combine(templateFormat, fileFormat),
        }),
    ],
});

export default toirBotLogger;
