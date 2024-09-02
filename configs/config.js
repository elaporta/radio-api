import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __rootdir = path.resolve(fileURLToPath(import.meta.url), '../../');

const config = {
    server: {
        protocol: process.env.SERVER_PROTOCOL,
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
        secret: process.env.SERVER_SECRET,
        logger: process.env.SERVER_LOGGER === 'true',
        rootdir: __rootdir
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD
    },
    webUrl: process.env.WEB_URL
};

export default config;