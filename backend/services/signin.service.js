const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

function sha256Hash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
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

      const generatedToken = jwt.sign(
        { pseudo, hashedPassword, userId: null }, // userId initialisé à null lors de la création
        process.env.JWT_SECRET,
        { expiresIn: '1w' }
      ).slice(0, 255);

      const newUser = await User.create({
        pseudo,
        password: hashedPassword,
        role: 'client',
        token: generatedToken,
      });

      // Mettez à jour le token avec l'ID de l'utilisateur après la création
      const updatedToken = jwt.sign(
        { pseudo, hashedPassword, userId: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: '1w' }
      ).slice(0, 255);

      await newUser.update({ token: updatedToken }); // Mettez à jour le token dans la base de données

      return { newUser, userToken: updatedToken };
    } catch (error) {
      console.error(error);
      return { error: 'Erreur à la création du compte' };
    }
  }
}

module.exports = SigninService;
