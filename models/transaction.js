'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Transaction extends Model { }
  Transaction.init({
    date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, { sequelize })
  Transaction.associate = function (models) {
    // associations can be defined here
    
  };
  return Transaction;
};