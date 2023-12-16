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

  static async getAppartementById(id) {
    try {
      const appartement = await Appartement.findOne({
        where: {
          id: Number(id)
        }
      });
      return appartement;
      } catch (error) {
        throw error;
      }
    }
}

module.exports = AppartementService;