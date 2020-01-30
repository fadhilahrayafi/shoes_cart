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
        // afterFind(instsance, option) {
        //   if (Array.isArray(instsance)) {
        //     for (let i = 0; i < instsance.length; i++) {
        //       if (instsance[i].Transactions[0].Carts) {
        //         console.log(">>>>>>>>>MASUK")
        //         for (let j = 0; j < instsance[i].Transactions[0].Carts.length; j++) {
        //           instsance[i].Transactions[0].Carts[j].total = instsance[i].Transactions[0].Carts[j].jumlah * instsance[i].Transactions[0].Carts[j].Shoe.price
        //           console.log(instsance[i].Transactions[0].Carts[j].total)
        //         }
        //       }
        //     }
        //   }
        // }
      }
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Transaction, { foreignKey: "user_id" })
  };
  return User;
};