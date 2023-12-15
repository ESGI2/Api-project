const { Reservation } = require('../../models/reservation.model');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const reservationController = {
  getAllReservations: async (req, res) => {
    try {
      const reservations = await Reservation.findAll();
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  getReservationById: async (req, res) => {
    const { reservationId } = req.params;

    try {
      const reservation = await Reservation.findByPk(reservationId); // Correction ici
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

      const reservation = await Reservation.create({
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
