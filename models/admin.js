'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Admin extends Model { }
  Admin.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "name must be filled" },
        notEmpty: { msg: "name must be filled" }
      }, allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: "Email is invalid!" },
        notNull: { msg: "email must be filled" },
        notEmpty: { msg: "email must be filled" }
      }, allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: {
          args: 8,
          msg: "password must be atleast 8 characters in length"
        },
        max: {
          args: 12,
          msg: "password must be not more than 12 characters in length"
        },
        notNull: { msg: "password must be filled" },
        notEmpty: { msg: "password must be filled" }
      }, allowNull: false
    }
  }, { sequelize })
  Admin.associate = function (models) {
    // associations can be defined here
  };
  return Admin;
};