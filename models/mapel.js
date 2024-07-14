'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mapel.hasMany(models.Jurnal, { foreignKey: 'materi', as: 'materi' });
    }
  }
  Mapel.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mapel',
  });
  return Mapel;
};