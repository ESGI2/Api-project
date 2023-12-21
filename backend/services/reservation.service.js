const  {Sequelize}  = require('sequelize');
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

  static async getReservationById(id) {
    try {
      const reservation = await Reservation.findByPk(id);
      return reservation;
    } catch (error) {
      console.error('Erreur lors de la récupération d\'une réservation par ID:', error);
      throw error;
    }
  }

  static async createReservation(appartement_id, client_id, date_debut, date_fin) {
    try {
      const reservation = await Reservation.create({
        appartement_id, 
        client_id, 
        date_debut,
        date_fin,
      });
      return reservation;
    } catch (error) {
      console.error('Erreur lors de la création d\'une réservation:', error);
      throw error;
    }
  }

  static async updateReservation(id, date_debut, date_fin) {
    try {
      const reservation = await Reservation.findByPk(id);

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

  static async deleteReservation(id) {
    try {
      
      const reservation = await Reservation.findByPk(id);
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

