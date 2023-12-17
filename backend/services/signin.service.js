const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/signin.models');

function sha256Hash(input) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

class SigninService {
  static async createUser(pseudo, password, token) {
    try {
      if (!pseudo || !password || !token) {
        throw new Error('Pseudo, password et token sont obligatoires.');
      }

      const hashedPassword = sha256Hash(password)
      const hashedtoken = sha256Hash(token)

      const newUser = await User.create({
        pseudo,
        password: hashedPassword,
        role: 'client',
        token: hashedtoken,
      });

      const userToken = jwt.sign({ pseudo: newUser.pseudo, userId: newUser.id, role: newUser.role }, token, {
        expiresIn: '1w',
      });

      return { newUser, userToken };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SigninService;
