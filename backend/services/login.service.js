const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const User = require('../models/user.models');

async function sha256Hash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

class LoginService {
  static async loginUser(pseudo, password) {
    try {
      if (!pseudo || !password) {
        throw new Error('Nom d\'utilisateur et mot de passe sont requis.');
      }

      // Utilisez votre propre méthode de recherche ou fonction pour obtenir les informations de l'utilisateur
      const hashedPassword = await sha256Hash(password);

      const existingUser = await User.findOne({
        where: {
          pseudo,
          password: hashedPassword,
        },
      });

      if (!existingUser) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
      }

      const userToken = existingUser.token;

      return { message: 'Vous êtes connecté.', token: userToken };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LoginService;
