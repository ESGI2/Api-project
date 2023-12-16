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
router.post('/', createAppartement);
router.put('/:id', updateAppartement);

module.exports = router;