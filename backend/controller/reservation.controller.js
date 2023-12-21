const express = require("express");
const router = express.Router();
const ReservationService = require("../services/reservation.service.js");
const Reservation = require("../models/reservation.models.js")
const Appartement = require("../models/appartement.models.js");

exports.getAllReservations = async (req, res) => {
    const role = req.user.role;
    const reservation = await ReservationService.getAllReservations();
    //const reservations = await ReservationService.getAllReservations();

    if(!reservation) {
        res.status(404).json({ message: 'Reservation not found' });
    } else {
        if (role == "admin") {
    try {
        res.status(200).json(reservation);
    } catch (error) {
        console.error('Erreur lors de la récupération d\'une réservation par ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
} else {
    res.status(401).json({ message: 'Unauthorized' });
}
}};

exports.getReservationById = async (req, res) => {
    const user_id = req.user.id;
    const role = req.user.role;
    const id = req.params.id;
    const reservation = await ReservationService.getReservationById(id);

    if(!reservation) {
        res.status(404).json({ message: 'Reservation not found' });
    } else {
        if (reservation.client_id == user_id || role == "admin") {
        try {
           const { id } = req.params;
                
            if (!reservation) {
                res.status(404).json({ message: 'Reservation not found' });
            } else {
                res.status(200).json(reservation);
            }
    
    } catch (error) {
        console.error('Erreur lors de la récupération d\'une réservation par ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
} else {
    res.status(401).json({ message: 'Unauthorized' });
}
}};



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

    const user_id = req.user.id;
    const role = req.user.role;
    console.log(user_id, role);

    const reservation = await ReservationService.getReservationById(id);
    if (!reservation) {
        res.status(404).json({ message: 'Reservation not found' });
    } else {
        if (reservation.client_id == user_id || role == "admin") {
            try {
                const reservation = await ReservationService.updateReservation(id, date_debut, date_fin );
                if (!reservation) {
                    res.status(404).json({ message: 'Reservation not found' });
                }
                else res.status(200).json({message: "Reservation updated", reservation});
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }    
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
};


  exports.deleteReservation = async (req, res) => {

    const user_id = req.user.id;
    const role = req.user.role;
    const id = req.params.id;

    const reservation = await ReservationService.getReservationById(id);
    if (!reservation) {
        res.status(404).json({ message: 'Reservation not found' });
    } else {
        if (reservation.client_id == user_id || role == "admin") {
            try {
                const reservation = await ReservationService.deleteReservation(id);
                if (!reservation) {
                    res.status(404).json({ message: 'Reservation not found' });
                }
                else res.status(200).json({message: "Reservation deleted"});
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }    
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
}

