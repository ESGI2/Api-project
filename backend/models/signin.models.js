// signin.models.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Signin = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pseudo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: { 
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING(255), // Augmentez la longueur maximale
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Signin;
