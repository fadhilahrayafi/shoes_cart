'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Shoe extends Model { }
  Shoe.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, { sequelize })
  Shoe.associate = function (models) {
    // associations can be defined here
    Shoe.belongsToMany(models.Transaction,{through:models.Cart,foreignKey:"ShoesId"})
  };
  return Shoe;
};