import config from './config.js';
import fastifyPlugin from 'fastify-plugin';
import sequelizeFastify from 'sequelize-fastify';

const sequelize = async (fastify, options) => {
    fastify.register(sequelizeFastify, {
        instance: 'db',
        sequelizeOptions: {
            dialect: 'mysql',
            database: config.mysql.database,
            username: config.mysql.username,
            password: config.mysql.password,
            host: config.mysql.host,
            port: config.mysql.port
        }
    }).ready(async () => {
        try {
            const result = await fastify.db.authenticate();
            console.log('Database connection is successfully established.');
        }
        catch(err) {
            console.error(`Database connection could not established: ${err}`);
            fastify.close();
            process.exit(1);
        }
    });
}

export default fastifyPlugin(sequelize);