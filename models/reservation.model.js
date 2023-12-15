const { DataTypes } = require('sequelize');
const sequelize = require('../backend/config/db');


module.exports = sequelize => {
  const Reservation = sequelize.define('Reservation', {
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  module.exports = Reservation;
  return Reservation;
};
