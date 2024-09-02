import config from './configs/config.js';
import Fastify from 'fastify';
import routes from './routes/routes.js';
import sequelize from './configs/sequelize.js';

const fastify = Fastify();

// Register sequelize (mysql DB)
fastify.register(sequelize);

// Register api routes
fastify.register(routes);

// Start the server
const start = async () => {
    try {
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