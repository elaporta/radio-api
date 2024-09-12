// Import routes
import staticImageRoute from './static.image.route.js';
import userRoute from './user.route.js';
import radioRoute from './radio.route.js';

// Merge routes
const mergedRoutes = [
    ...staticImageRoute,
    ...userRoute,
    ...radioRoute
];

// Add api routes into the server
const routes = async (fastify, options) => {
    for(let route of mergedRoutes) {
        fastify.route(route);
    }
}

export default routes;