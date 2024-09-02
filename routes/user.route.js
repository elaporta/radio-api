// Schemas
import userSchema from '../schemas/user.schema.js';

// Middleware
import userMiddleware from '../middlewares/user.middleware.js';

// Controller
import userController from '../controllers/user.controller.js';

const userRoute = [
    {
        method: 'GET',
        url: '/user/:id',
        schema: userSchema.get,
        preHandler: userMiddleware.get,
        handler: userController.get
    }
];

export default userRoute;