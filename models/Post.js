const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');  // Import the User model

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Define relationships
Post.belongsTo(User, { foreignKey: 'authorId' });
User.hasMany(Post, { foreignKey: 'authorId' });

module.exports = Post;
