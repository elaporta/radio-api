import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';
import countries from '../datasets/countries.js';

// Options
const options = {
	timestamps: true,
	underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at',
	tableName: 'radios',
    defaultScope: { attributes: { exclude: ['img_url', 'raddios_url', 'deleted_at'] } },
    scopes: { allAttributes: { attributes: {} } }
};

// Attributes
const attributes = {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
	title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    img_url: { type: DataTypes.STRING(2048), allowNull: false, validate: { notEmpty: true, isUrl: true } },
    img_file: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    stream_url: { type: DataTypes.STRING(2048), allowNull: false, validate: { notEmpty: true, isUrl: true } },
    country: { type: DataTypes.ENUM, allowNull: false, values: countries },
    locations: { type: DataTypes.JSON, allowNull: true },
    genres: { type: DataTypes.JSON, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true, validate: { notEmpty: true } },
    ranking: { type: DataTypes.INTEGER, allowNull: true, validate: { notEmpty: true } },
    url: { type: DataTypes.STRING(2048), allowNull: false, validate: { notEmpty: true, isUrl: true } },
    raddios_url: { type: DataTypes.STRING(2048), allowNull: false, validate: { notEmpty: true, isUrl: true } }
};

const Radio = sequelize.define('radio', attributes, options);

export default Radio;