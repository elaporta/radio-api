'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Radio extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Radio.init({
        name: DataTypes.STRING,
        raddios_url: DataTypes.STRING,
        img_url: DataTypes.STRING,
        img_file: DataTypes.STRING,
        stream_url: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Radio',
    });
    return Radio;
};