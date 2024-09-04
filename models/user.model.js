import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';
import countries from '../interfaces/countries.js';

// Options
const options = {
	timestamps: true,
	underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at',
	tableName: 'users'
};

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

const User = sequelize.define('user', attributes, options);

export default User;