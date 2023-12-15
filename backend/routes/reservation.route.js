const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/api/reservation', authenticateUser, reservationController.getAllReservations);
router.get('/api/reservation/:reservationId', authenticateUser, reservationController.getReservationById);
router.post('/api/reservation', authenticateUser, reservationController.createReservation);

module.exports = router;
