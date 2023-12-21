const { Sequelize, Op } = require('sequelize');
const Reservation = require('../models/reservation.models.js');
const Appartement = require ('../models/appartement.models.js')


class ReservationService {
  static async getAllReservations() {
    try {
      const reservations = await Reservation.findAll();
      return reservations;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getReservationById(reservationId) {
    try {
      const reservation = await Reservation.findByPk(reservationId);
      return reservation;
    } catch (error) {
      console.error('Erreur lors de la récupération d\'une réservation par ID:', error);
      throw error;
    }
  }

  static async createReservation(appartementId, userId, date_debut, date_fin) {
    try {
      const reservation = await Reservation.create({
        appartement_id: appartementId, 
        client_id: userId, 
        date_debut,
        date_fin,
      });
      return { reservation, token: "your_generated_token" };
    } catch (error) {
      console.error('Erreur lors de la création d\'une réservation:', error);
      throw error;
    }
  }

  static async updateReservation(reservationId, date_debut, date_fin) {
    try {
      const reservation = await Reservation.findByPk(reservationId);

        await reservation.update({
          date_debut,
          date_fin,
        });

        return reservation;
    
      return null;
    } catch (error) {
      console.error('Erreur lors de la mise à jour d\'une réservation:', error);
      throw error;
    }
  }

  static async deleteReservation(reservationId) {
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (reservation) {
        await reservation.destroy();
        return reservation;
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la suppression d\'une réservation:', error);
      throw error;
    }
  }

}

module.exports = ReservationService;

