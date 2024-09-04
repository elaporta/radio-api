import sequelizeFastify from 'sequelize-fastify';
import User from '../models/user.js';
import db from '../database/connection.js';

const get = async (req, reply) => {
    try {
        console.log(db);
        // const user = new User({ name: 'emanuel' });
        // console.log(user);
        const response = { statusCode: 200, message: 'Success', data: `Hello user #${req.params.id}` };
        reply.code(response.statusCode).send(response);
    }
    catch(error) {
        console.log(error);
        const response = { statusCode: 500, error: 'Bad Request', message: error };
        reply.code(response.statusCode).send(response);
    }
};

const userController = {
    get: get
};

export default userController;