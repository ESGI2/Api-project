const express = require("express");
const {
    getAllAppartement,
    getAppartementById,
    createAppartement,
    updateAppartement,
    deleteAppartement
} = require("../controller/appartement.controller");
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/',authenticateToken, getAllAppartement);
router.get('/:id', authenticateToken, getAppartementById);
router.post('/', authenticateToken, createAppartement);
router.put('/:id', authenticateToken, updateAppartement);
router.delete('/:id', authenticateToken, deleteAppartement);

module.exports = router;