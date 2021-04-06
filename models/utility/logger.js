const winston = require('winston');
const moment = require('moment-timezone');
const path = require('path');
const config = require('./config.js');
const {createLogger, format, transports} = winston;

const timestampWithTz = format((info, opts) => {
    if (opts.tz) {
        info.timestamp = moment().tz(opts.tz).format('YYYY-MM-DD HH:mm:ss');
    }
    return info;
});

const myFormat = format.printf(({level, message, timestamp, stack}) => {
    let formattedMessage = `${timestamp} :: [${level}]`;

    if (stack) {
        return `${formattedMessage} ${stack}`;
    }

    return `${formattedMessage} ${message}`;
});

const tz = config.get('tz');
const logPath = config.get('logPath');

const logger = createLogger({
    format: format.combine(
        format.errors({
            stack: true
        }),
        timestampWithTz({tz}),
        myFormat,
    ),
    transports: [
        new transports.File({
            filename: path.join(__dirname, `../../${logPath}`)
        }),
        new transports.Console()
    ],
});

module.exports = logger;
