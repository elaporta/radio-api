// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//     class User extends Model {
//         /**
//          * Helper method for defining associations.
//          * This method is not a part of Sequelize lifecycle.
//          * The `models/index` file will call this method automatically.
//          */
//         static associate(models) {
//             // define association here
//         }
//     }

//     User.init({
//         name: DataTypes.STRING,
//         lastName: DataTypes.STRING,
//         email: DataTypes.STRING
//     }, {
//         sequelize,
//         modelName: 'User',
//     });

//     return User;
// };

import { Sequelize, DataTypes } from 'sequelize';
import db from '../database/connection.js';

// Options
const options = {
	timestamps: true,
	underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at',
	tableName: 'users'
};

const countries = ['URY', 'ARG', 'BRA', 'CHL', 'ESP', 'USA'];

// Attributes
const attributes = {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
	name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
	last_name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
	email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
	password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
	role: { type: DataTypes.ENUM, values: ['admin', 'listener'], defaultValue: 'listener', allowNull: false, validate: { notEmpty: true } },
	country: { type: DataTypes.ENUM, values: countries, allowNull: false, validate: { notEmpty: true } }
};

export default (fastify) => {
    const User = fastify.db.define('user', attributes, options);
    return User;
};