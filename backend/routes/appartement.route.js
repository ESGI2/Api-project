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

module.exports = router;