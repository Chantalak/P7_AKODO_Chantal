'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post,
        {onDelete: 'cascade' });
      models.User.hasMany(models.Comment,
        { onDelete: 'cascade' });
    }
  };
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};