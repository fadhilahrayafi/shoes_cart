'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model { }
  Cart.init({
    ShoesId: DataTypes.INTEGER,
    TransactionsId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER
  }, {sequelize});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Shoe,{foreignKey:"ShoesId"})
  };
  return Cart;
};