import User from '../models/user.model.js';

const get = async (req, reply) => {
    try {
        const user = new User({ name: 'emanuel', country: 'ECU' });
        console.log(user);
        const response = { statusCode: 200, message: 'Success', data: `Hello user #${req.params.id}` };
        reply.code(response.statusCode).send(response);
    }
    catch(error) {
        console.log(error);
        const response = { statusCode: 500, error: 'Internal Server Error' };
        reply.code(response.statusCode).send(response);
    }
};

export default {
    get: get
}