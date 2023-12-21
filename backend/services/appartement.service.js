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
      if (appartement) return appartement;
      else return null;
      } catch (error) {
        throw error;
      }
    }

  static async createAppartement(superficie, capacite, adresse, prix_nuit, client_id) {
    const disponibilite = true;
    try {
      const appartement = await Appartement.create({
        superficie,
        capacite,
        adresse,
        disponibilite,
        prix_nuit,
        client_id
      });
      return appartement;
    } catch (error) {
      throw error;
    }
  }

  static async updateAppartement(id, superficie, capacite, adresse, prix_nuit) {
    try {
      const appartement = await Appartement.findOne({
        where: {
          id: Number(id)
        }
      });
      if (appartement) {
        await Appartement.update({
          superficie,
          capacite,
          adresse,
          prix_nuit
        }, {
          where: {
            id: Number(id)
          }
        });
        return appartement;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAppartement(id) {
    try {
      const appartement = await Appartement.findOne({
        where: {
          id: Number(id)
        }
      });
      if (appartement) {
        const deletedAppartement = await Appartement.destroy({
          where: {
            id: Number(id)
          }
        });
        return deletedAppartement;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AppartementService;