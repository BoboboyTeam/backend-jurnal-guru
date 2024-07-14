'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jurnal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jurnal.belongsTo(models.JP, { foreignKey: 'dari', as: 'dari' });
      Jurnal.belongsTo(models.JP, { foreignKey: 'ke', as: 'ke' });
      Jurnal.belongsTo(models.Class, { foreignKey: 'class', as: 'class' });
      Jurnal.belongsTo(models.mapel, { foreignKey: 'materi', as: 'materi' });
      Jurnal.belongsTo(models.User, { foreignKey: 'guru', as: 'guru' });
    }
  }
  Jurnal.init({
    name: DataTypes.STRING,
    guru: DataTypes.INTEGER,
    class: DataTypes.INTEGER,
    materi: DataTypes.INTEGER,
    dari: DataTypes.INTEGER,
    ke: DataTypes.INTEGER,
    jumlah_jp: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Jurnal',
  });
  return Jurnal;
};