// Schemas
import radioSchema from '../schemas/radio.schema.js';

// Controller
import radioController from '../controllers/radio.controller.js';

const radioRoute = [
    {
        method: 'GET',
        url: '/radio',
        handler: radioController.get
    },
    {
        method: 'GET',
        url: '/radio/:id',
        schema: radioSchema.getById,
        handler: radioController.getById
    },
    {
        method: 'GET',
        url: '/radio/find',
        schema: radioSchema.find,
        handler: radioController.find
    }
];

export default radioRoute;