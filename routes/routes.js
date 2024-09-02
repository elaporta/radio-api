// Import routes
import userRoute from './user.route.js';

// Merge routes
const mergedRoutes = [
    ...userRoute
];

// Add api routes into the server
const routes = async (fastify, options) => {
    for(let route of mergedRoutes) {
        fastify.route(route);
    }
}

export default routes;