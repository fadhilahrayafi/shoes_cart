'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  const passwordHash = require('password-hash')
  class User extends Model { }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Must fill"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Must fill"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Must fill"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Must fill"
        }
      }
    }
  }, {
      sequelize,
      hooks: {
        beforeCreate(user, option) {
          user.password = passwordHash.generate(user.password)
        },
        afterFind(user, option) {
          if(!Array.isArray(user)){
            if(user.Transactions){
              if(user.Transactions.length === 1){
                let total = 0
                for(let i = 0; i < user.Transactions[0].Carts.length; i++){
                  let value = user.Transactions[0].Carts[i].jumlah * user.Transactions[0].Carts[i].Shoe.price
                  user.Transactions[0].Carts[i].setDataValue("total", value)
                  total += value
                }
                user.Transactions[0].setDataValue("total",total)
              }
            }
          }
          
        }
      }
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Transaction, { foreignKey: "user_id" })
  };
  return User;
};