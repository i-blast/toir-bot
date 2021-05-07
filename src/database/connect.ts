import mongoose from 'mongoose';
import config from 'config';
import logger from '../util/logger';

export default () => {
    const connect = () => {
        const db_url = `${config.get('toir-bot.database.url')}`;
        mongoose
            .connect(db_url, { useNewUrlParser: true })
            .then(() => {
                return logger.info(`Successfully connected to ${db_url}`);
            })
            .catch((error) => {
                logger.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
