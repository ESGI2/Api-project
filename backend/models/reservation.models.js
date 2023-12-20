const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
}, {
    timestamps: false,
});

module.exports = Reservation;
