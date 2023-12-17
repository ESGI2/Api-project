const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/signin.models');

function sha256Hash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex').slice(0, 255); // Réduisez la longueur du hachage à 255 caractères
}

class SigninService {
  static async createUser(pseudo, password) {
    try {
      if (!pseudo || !password) {
        throw new Error('Pseudo et mot de passe sont obligatoires.');
      }

      const hashedPassword = sha256Hash(password);

      // Générez un token unique
      const generatedToken = jwt.sign({ pseudo, hashedPassword }, process.env.JWT_SECRET, {
        expiresIn: '1w',
      }).slice(0, 255); // Réduisez la longueur du token à 255 caractères

      const newUser = await User.create({
        pseudo,
        password: hashedPassword,
        role: 'client',
        token: generatedToken,
      });

      return { newUser, userToken: generatedToken };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SigninService;
