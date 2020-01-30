'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  const passwordHash = require('password-hash')
  class User extends Model{}
  User.init({
    name: {
      type : DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : "Must fill"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : "Must fill"
        }
      }
    },
    address: {
      type : DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : "Must fill"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : "Must fill"
        }
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate(user,option){
        user.password = passwordHash.generate(user.password)
      },
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};