import { Op } from 'sequelize';
import Radio from '../models/radio.model.js';

const get = async (req, reply) => {
    try {
        const radios = await Radio.findAll();
        const response = { statusCode: 200, message: 'Success', data: radios };
        reply.code(response.statusCode).send(response);
    }
    catch(error) {
        console.log(error);
        const response = { statusCode: 500, error: 'Internal Server Error' };
        reply.code(response.statusCode).send(response);
    }
};

const getById = async (req, reply) => {
    try {
        const radio = await Radio.findByPk(req.params.id);
        const response = { statusCode: 200, message: 'Success', data: radio };
        reply.code(response.statusCode).send(response);
    }
    catch(error) {
        console.log(error);
        const response = { statusCode: 500, error: 'Internal Server Error' };
        reply.code(response.statusCode).send(response);
    }
};

const find = async (req, reply) => {
    try {
        const conditions = {};
        const { id, title, country, ranking, location, genre } = req.query;

        // mysql
        if(id) conditions.id = id;
        if(title) conditions.title = { [Op.like]: `%${title}%` };
        if(country) conditions.country = country;
        if(ranking) conditions.ranking = { [Op.lte]: +ranking };

        let radios = await Radio.findAll({ where: conditions });

        // memory
        if(location) radios = radios.filter(radio => Array.isArray(radio.locations) && radio.locations.includes(location));
        if(genre) radios = radios.filter(radio => Array.isArray(radio.genres) && radio.genres.includes(genre));

        const response = { statusCode: 200, message: 'Success', data: radios };
        reply.code(response.statusCode).send(response);
    }
    catch(error) {
        console.log(error);
        const response = { statusCode: 500, error: 'Internal Server Error' };
        reply.code(response.statusCode).send(response);
    }
};

export default {
    get: get,
    getById: getById,
    find: find
}