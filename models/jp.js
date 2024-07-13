'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JP.hasMany(models.Jurnal, { foreignKey: 'dari', as: 'jurnal' });
      JP.hasMany(models.Jurnal, { foreignKey: 'ke', as: 'jurnal' });
    }
  }
  JP.init({
    jam: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'JP',
  });
  return JP;
};