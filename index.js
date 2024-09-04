import Fastify from 'fastify';
import config from './config/config.js';
import db from './database/connection.js';
import routes from './routes/routes.js';

const fastify = Fastify();

// Register mysql DB connection
fastify.register(db);

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