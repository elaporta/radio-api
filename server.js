import Fastify from 'fastify';
import cors from '@fastify/cors'
import { fastifyStatic } from '@fastify/static';
import config from './config/config.js';
import sequelize from './database/sequelize.js';
import routes from './routes/routes.js';

const fastify = Fastify();

// Register cors
await fastify.register(cors);

// Register static/images folder
fastify.register(fastifyStatic, { root: `${config.server.rootdir}/static/images`, prefix: '/images/' });

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