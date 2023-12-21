const express = require("express");
const router = express.Router();
const ReservationService = require("../services/reservation.service.js");
const Reservation = require("../models/reservation.models.js")
const Appartement = require("../models/appartement.models.js");

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await ReservationService.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Erreur lors de la récupération de toutes les réservations:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await ReservationService.getReservationById(id);
        if (!reservation) {
            res.status(404).json({ message: 'Reservation not found' });
        } else {
            res.status(200).json(reservation);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération d\'une réservation par ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createReservation = async (req, res) => {
    try {
        const { date_debut, date_fin, client_id, appartement_id } = req.body;
        const appartement = await Appartement.findByPk(appartement_id);
        if (!appartement) {
            return res.status(404).json({ message: 'Appartement not found' });
        }

        const result = await ReservationService.createReservation(
            appartement_id,
            client_id,
            date_debut,
            date_fin,
        );

        res.status(201).json({ message: "Reservation created", reservation: result.reservation, token: result.token });
    } catch (error) {
        console.error('Erreur lors de la création d\'une réservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateReservation = async (req, res) => {
    const { id } = req.params;
    const { date_debut, date_fin } = req.body;
    try {
      const reservation = await Reservation.findByPk(id);
      if (reservation) {
        await reservation.update({
          date_debut,
          date_fin,
        });
        res.json(reservation);
      } else {
        res.status(404).json({ error: 'Réservation non trouvée.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation.' });
    }
  };

exports.deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
      const reservation = await Reservation.findByPk(id);
      if (reservation) {
        await reservation.destroy();
        res.json({ message: 'Réservation supprimée.' });
      } else {
        res.status(404).json({ error: 'Réservation non trouvée.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression de la réservation.' });
    }
  };

