const { Reservation } = require('../models/reservation.models');
const { Op } = require('sequelize');

class ReservationService {
  static async getAllReservations() {
    try {
      const reservations = await Reservation.findAll();
      return reservations;
    } catch (error) {
      throw error;
    }
  }

  static async getReservationById(reservationId) {
    try {
      const reservation = await Reservation.findByPk(reservationId);
      return reservation;
    } catch (error) {
      throw error;
    }
  }

  static async createReservation(appartementId, userId, dateDebut, dateFin, prix) {
    try {
      const isAvailable = await this.checkAppartementAvailability(appartementId, dateDebut, dateFin);
      if (!isAvailable) {
        throw new Error('L\'appartement n\'est pas disponible pour ces dates.');
      }

      const reservation = await Reservation.create({
        appartementId,
        userId,
        dateDebut,
        dateFin,
        prix,
      });

      const token = this.generateToken(userId, 'user');

      return { reservation, token };
    } catch (error) {
      throw error;
    }
  }

  static async checkAppartementAvailability(appartementId, dateDebut, dateFin) {
    try {
      const existingReservations = await Reservation.findAll({
        where: {
          appartementId,
          [Op.or]: [
            {
              dateDebut: { [Op.between]: [dateDebut, dateFin] },
            },
            {
              dateFin: { [Op.between]: [dateDebut, dateFin] },
            },
          ],
        },
      });

      return existingReservations.length === 0;
    } catch (error) {
      throw new Error('Erreur lors de la vérification de la disponibilité de l\'appartement.');
    }
  }

  static generateToken(userId, role) {
    const token = 'ton_code_pour_generer_le_token';
    return token;
  }

  static async updateReservation(reservationId, dateDebut, dateFin, prix) {
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (reservation) {
        await Reservation.update({
          dateDebut,
          dateFin,
          prix,
        }, {
          where: {
            id: reservationId,
          },
        });
        return reservation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteReservation(reservationId) {
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (reservation) {
        await Reservation.destroy({
          where: {
            id: reservationId,
          },
        });
        return reservation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReservationService;
