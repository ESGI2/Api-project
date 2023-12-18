const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

function sha256Hash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex').slice(0, 255);
}

class SigninService {
  static async createUser(pseudo, password) {
    try {
      if (!pseudo || !password) {
        return { error: 'Pseudo et mot de passe sont obligatoires.' };
      }

      const existingUser = await User.findOne({ where: { pseudo } });
      if (existingUser) {
        return { error: 'Le pseudo existe déjà.' };
      }

      const hashedPassword = sha256Hash(password);

      const generatedToken = jwt.sign({ pseudo, hashedPassword }, process.env.JWT_SECRET, {
        expiresIn: '1w',
      }).slice(0, 255);

      const newUser = await User.create({
        pseudo,
        password: hashedPassword,
        role: 'client',
        token: generatedToken,
      });

      return { newUser, userToken: generatedToken };
    } catch (error) {
      console.error(error);
      return { error: 'Erreur à la création du compte' };
    }
  }
}

module.exports = SigninService;
