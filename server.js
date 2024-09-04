import Fastify from 'fastify';
import config from './config/config.js';
import sequelize from './database/sequelize.js';
import routes from './routes/routes.js';

const fastify = Fastify();

// Register api routes
fastify.register(routes);

// Start the server
const start = async () => {
    try {
        // Database connection
        await sequelize.authenticate().then(() => console.log('Database connection is successfully established.'));

        // Server listen
        await fastify.listen({ host: config.server.host, port: config.server.port });
    }
    catch(error) {
        console.error(error);
        if(config.server.logger) fastify.log.error(error);
        fastify.close();
        process.exit(1);
    }
}
start();