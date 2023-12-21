const express = require("express");
const router = express.Router();
const ReservationService = require("../services/reservation.service.js");
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
        const { reservationId } = req.params;
        const reservation = await ReservationService.getReservationById(reservationId);
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
        const { dateDebut, dateFin, client_id, appartement_id } = req.body;
        const appartement = await Appartement.findByPk(appartement_id);
        if (!appartement) {
            return res.status(404).json({ message: 'Appartement not found' });
        }

        const result = await ReservationService.createReservation(
            appartement_id,
            client_id,
            dateDebut,
            dateFin,
        );

        res.status(201).json({ message: "Reservation created", reservation: result.reservation, token: result.token });
    } catch (error) {
        console.error('Erreur lors de la création d\'une réservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { dateDebut, dateFin } = req.body;
        const reservation = await ReservationService.updateReservation(reservationId, dateDebut, dateFin);
        if (!reservation) {
            res.status(404).json({ message: 'Reservation not found' });
        } else {
            res.status(200).json({ message: "Reservation updated", reservation });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour d\'une réservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await ReservationService.deleteReservation(reservationId);
        if (!reservation) {
            res.status(404).json({ message: 'Reservation not found' });
        } else {
            res.status(200).json({ message: "Reservation deleted" });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression d\'une réservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
