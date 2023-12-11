const express = require("express");
const {
    getAllAppartement,
    getAppartementById,
    createAppartement,
    updateAppartement,
    deleteAppartement
} = require("../controller/appartement.controller");

const router = express.Router();

router.get('/', getAllAppartement);
router.get('/:id', getAppartementById);

module.exports = router;