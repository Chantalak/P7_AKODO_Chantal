'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      // define association here
			models.Comment.belongsTo(models.User);
			models.Comment.belongsTo(models.Post, {
				foreignKey: {
					allowNull: true,
				},
			});
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};