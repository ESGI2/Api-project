const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.models');
const Appartement = require('./appartement.models');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  appartement_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Appartement,
      key: 'id'
    }
  }
}, {
  timestamps: false,
});

module.exports = Reservation;
