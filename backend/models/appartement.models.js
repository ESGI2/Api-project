// Importation des dépendances
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assurez-vous d'avoir configuré votre connexion à la base de données dans le fichier db.js

// Définition du modèle Appartement
const Appartement = sequelize.define('Appartement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  superficie: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  capacite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  disponibilite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  prix_nuit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false, // Désactiver l'ajout automatique des colonnes createdAt et updatedAt
  });
  
// Exportation du modèle
module.exports = Appartement;
