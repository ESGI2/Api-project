const express = require("express");
const router = express.Router();
const db = require("../config/db");
const UserServices = require('../services/user.service');
const AppartementServices = require('../services/appartement.service');
const ReservationServices = require('../services/reservation.service');

module.exports.getSelfUser = async (req, res) => {

    // On récupère l'utilisateur connecté
    const id = req.user.id;

    try {
        const user = await UserServices.getUserById(id);
        if (user) {

            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.getAllUser = async (req, res) => {
    try {
        const users = await UserServices.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.getUserById = async (req, res) => {
    try {
        const user = await UserServices.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}