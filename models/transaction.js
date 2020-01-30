'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Transaction extends Model { }
  Transaction.init({
    date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, { sequelize })
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsToMany(models.Shoe, { through: models.Cart, foreignKey: "TransactionsId" })
    Transaction.belongsTo(models.User, { foreignKey: "user_id" })
    Transaction.hasMany(models.Cart, { foreignKey: "TransactionsId" })
  };
  return Transaction;
};