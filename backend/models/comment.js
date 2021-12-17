'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Post, {
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'postId',
      });

      models.Post.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'postId',
        otherKey: 'userId',
      });

      //Lien entre clés étrangères 
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })

      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
      })
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};