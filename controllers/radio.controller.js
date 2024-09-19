import { Op } from 'sequelize';
import Radio from '../models/radio.model.js';
import sequelize from '../database/sequelize.js';

const get = async (req, reply) => {
    try {
        const radios = await Radio.findAll({ order: [['title', 'ASC']] });
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
        const orderBy = [['title', 'ASC']];
        const { id, title, country, ranking, location, genre, order } = req.query;

        // mysql
        if(id) conditions.id = id;
        if(title) conditions.title = { [Op.like]: `%${title}%` };
        if(country) conditions.country = country;
        if(ranking) conditions.ranking = { [Op.lte]: +ranking };
        if(order && order != 'title') orderBy.unshift([order, 'ASC']);

        let radios = await Radio.findAll({ where: conditions, order: orderBy });

        // memory
        if(location) radios = radios.filter(radio => Array.isArray(radio.locations) && radio.locations.includes(String(location).toLowerCase()));
        if(genre) radios = radios.filter(radio => Array.isArray(radio.genres) && radio.genres.includes(String(genre).toLowerCase()));

        const response = { statusCode: 200, message: 'Success', data: radios };
        reply.code(response.statusCode).send(response);
    }
    catch(error) {
        console.log(error);
        const response = { statusCode: 500, error: 'Internal Server Error' };
        reply.code(response.statusCode).send(response);
    }
};

const getGenres = async (req, reply) => {
    try {
        const results = await sequelize.rawQuery(`SELECT DISTINCT jt.genre FROM radios, JSON_TABLE(radios.genres, '$[*]' COLUMNS (genre VARCHAR(255) PATH '$')) AS jt ORDER BY jt.genre;`);
        const genres = results.map(row => row.genre);
        const response = { statusCode: 200, message: 'Success', data: genres };
        reply.code(response.statusCode).send(response);
    }
    catch(error) {
        console.log(error);
        const response = { statusCode: 500, error: 'Internal Server Error' };
        reply.code(response.statusCode).send(response);
    }
}

export default {
    get: get,
    getById: getById,
    find: find,
    getGenres: getGenres
}