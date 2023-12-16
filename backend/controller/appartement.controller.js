const express = require("express");
const router = express.Router();
const AppartementService = require("../services/appartement.service");

// Controller for appartement

exports.getAllAppartement = async (req, res) => {
    try {
        const appartements = await AppartementService.getAllAppartements();
        res.status(200).json(appartements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAppartementById = async (req, res) => {
    try {
        const { id } = req.params;
        const appartement = await AppartementService.getAppartementById(id);
        if (!appartement) {
            res.status(404).json({ message: 'Appartement not found' });
        }
        else res.status(200).json(appartement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createAppartement = async (req, res) => {
    try {
        console.log(req.body);
        const { superficie, capacite, adresse, prix_nuit } = req.body;
        const appartement = await AppartementService.createAppartement(superficie, capacite, adresse, prix_nuit);
        res.status(201).json({message: "Appartement created", appartement});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateAppartement = async (req, res) => {
    try {
        const { id } = req.params;
        const { superficie, capacite, adresse, prix_nuit } = req.body;
        const appartement = await AppartementService.updateAppartement(id, superficie, capacite, adresse, prix_nuit);
        if (!appartement) {
            res.status(404).json({ message: 'Appartement not found' });
        }
        else res.status(200).json({message: "Appartement updated", appartement});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteAppartement = async (req, res) => {
    try {
        const { id } = req.params;
        const appartement = await AppartementService.deleteAppartement(id);
        if (!appartement) {
            res.status(404).json({ message: 'Appartement not found' });
        }
        else res.status(200).json({message: "Appartement deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}