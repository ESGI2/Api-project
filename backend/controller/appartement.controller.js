const express = require("express");
const router = express.Router();
const db = require("../config/db");
const AppartementService = require("../services/appartement.service");

// Controller for appartement

exports.getAllAppartement = (req, res) => {
    try {
        const appartements = AppartementService.getAllAppartements();
        res.status(200).json(appartements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};