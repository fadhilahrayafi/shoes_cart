'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Shoe extends Model { }
  Shoe.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "shoe name must be filled" },
        notEmpty: { msg: "shoe name must be filled" }
      }, allowNull: false
    },
    img: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: { msg: "price must be filled" },
        notEmpty: { msg: "price must be filled" }
      }, allowNull: false
    }
  }, { sequelize })
  Shoe.associate = function (models) {
    // associations can be defined here
    Shoe.belongsToMany(models.Transaction, { through: models.Cart, foreignKey: "ShoesId" })
  };
  return Shoe;
};