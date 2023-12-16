const { Sequelize } = require('sequelize');
const Appartement = require('../models/appartement.models');

class AppartementService {
  static async getAllAppartements() {
    try {
      const appartements = await Appartement.findAll();
      return appartements;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AppartementService;