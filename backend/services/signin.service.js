// signin.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/signin.models');

class SigninService {
  static async createUser(pseudo, password, token) {
    try {
      if (!pseudo || !password || !token) {
        throw new Error('Pseudo, password et token sont obligatoires.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedtoken = await bcrypt.hash(token, 10);

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
