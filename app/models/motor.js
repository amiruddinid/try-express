'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Motor.init({
    model: DataTypes.STRING,
    manufaktur: DataTypes.STRING,
    transmisi: DataTypes.STRING,
    tglPembuatan: DataTypes.DATE,
    foto: DataTypes.STRING,
    hargaSewa: DataTypes.DECIMAL,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Motor',
  });
  return Motor;
};