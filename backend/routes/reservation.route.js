const express = require("express");
const {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
} = require("../controller/reservation.controller.js");
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');

router.get('/',authenticateToken, getAllReservations);
router.get('/:id',authenticateToken, getReservationById);
router.post('/', authenticateToken, createReservation);
router.put('/:id',authenticateToken, updateReservation);
router.delete('/:id',authenticateToken, deleteReservation);

module.exports = router;
