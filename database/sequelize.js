import config from '../config/config.js';
import { Sequelize } from 'sequelize';

// Database connection
const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: config.mysql.dialect,
    logging: config.mysql.logging,
    dialectOptions: { supportBigNumbers: true, multipleStatements: true },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    // operatorsAliases: { $not: Sequelize.Op.not, $in: Sequelize.Op.in, $notIn: Sequelize.Op.notIn, $or: Sequelize.Op.or, $gt: Sequelize.Op.gt, $gte: Sequelize.Op.gte, $lte: Sequelize.Op.lte, $between: Sequelize.Op.between, $like: Sequelize.Op.like }
});

sequelize.rawQuery = async (query, returnType = '') => {
    let response = {};
    await sequelize.query(query, { raw: true }).spread((results, metadata) => response = results);
    if(returnType == 'single' && response.length > 0) response = response[0];
    return response;
}

export default sequelize;