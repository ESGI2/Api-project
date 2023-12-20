const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

function sha256Hash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

class LoginService {
  static async loginUser(pseudo, password, apiKey) {
    try {
      if (!pseudo || !password || !apiKey) {
        throw new Error('Username, password, and API key are required.');
      }

      const hashedPassword = sha256Hash(password);

      // Search for the user in the database
      const existingUser = await User.findOne({
        where: {
          pseudo,
          password: hashedPassword,
          token: apiKey,
        },
      });

      if (!existingUser) {
        throw new Error('Incorrect username, password, or API key.');
      }

      const userToken = jwt.sign(
        { pseudo: existingUser.pseudo, userId: existingUser.id, role: existingUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1w' }
      );

      return { message: 'Vous êtes connecté.', token: userToken };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LoginService;
