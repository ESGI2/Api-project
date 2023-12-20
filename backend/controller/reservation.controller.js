const { Reservation } = require('../models/reservation.models.js');
const ReservationService = require("../services/reservation.service");
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const reservationController = {
  getAllReservations: async (req, res) => {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  getReservationById: async (req, res) => {
    const { reservationId } = req.params;

    try {
      const reservation = await ReservationService.findByPk(reservationId);
      if (!reservation) {
        return res.status(404).json({ error: 'Réservation non trouvée' });
      }
      res.json(reservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  createReservation: async (req, res) => {
    const { appartementId, dateDebut, dateFin, prix } = req.body;
    const userId = req.user.id;

    try {
      const isAvailable = await checkAppartementAvailability(appartementId, dateDebut, dateFin);
      if (!isAvailable) {
        return res.status(400).json({ error: 'L\'appartement n\'est pas disponible pour ces dates' });
      }

      const reservation = await ReservationService.create({
        appartementId,
        userId,
        dateDebut,
        dateFin,
        prix,
      });

      const token = jwt.sign({ userId, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ reservation, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  updateReservation: async (req, res) => {
    const { reservationId } = req.params;
    const { dateDebut, dateFin, prix } = req.body;

    try {
      const reservation = await ReservationService.findByPk(reservationId);
      if (!reservation) {
        return res.status(404).json({ error: 'Réservation non trouvée' });
      }

      const updatedReservation = await ReservationService.update({
        dateDebut,
        dateFin,
        prix,
    }, {
        where: {
            id: reservationId,
            userId: req.user.id, 
        },
        returning: true,
    });
    
    

      res.status(200).json({ message: 'Réservation mise à jour', reservation: updatedReservation[1][0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  deleteReservation: async (req, res) => {
    const { reservationId } = req.params;

    try {
      const reservation = await ReservationService.findByPk(reservationId);
      if (!reservation) {
        return res.status(404).json({ error: 'Réservation non trouvée' });
      }

      await ReservationService.destroy({
        where: {
          id: reservationId,
        },
      });

      res.status(200).json({ message: 'Réservation supprimée' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },
};

async function checkAppartementAvailability(appartementId, dateDebut, dateFin) {
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
    console.error(error);
    throw new Error('Erreur lors de la vérification de la disponibilité de l\'appartement.');
  }
}

module.exports = reservationController;
