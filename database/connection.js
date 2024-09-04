import config from '../config/config.js';
// import fastifyPlugin from 'fastify-plugin';
import sequelizeFastify from 'sequelize-fastify';

const db = async (fastify, options) => {
    fastify.register(sequelizeFastify, {
        instance: 'sequelize',
        sequelizeOptions: {
            dialect: config.mysql.dialect,
            database: config.mysql.database,
            username: config.mysql.username,
            password: config.mysql.password,
            host: config.mysql.host,
            port: config.mysql.port
        }
    }).ready(async () => {
        try {
            const result = await fastify.sequelize.authenticate();
            console.log('Database connection is successfully established.');
        }
        catch(err) {
            console.error(`Database connection could not established: ${err}`);
            fastify.close();
            process.exit(1);
        }
    });
}

// export default fastifyPlugin(db);
export default db;