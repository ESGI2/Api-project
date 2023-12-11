const express = require("express");
const router = express.Router();
const db = require("../config/db");

module.exports.getAllAppartement = (req, res) => {
    try {
        db.query("SELECT * FROM appartements", (err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving appartement.",
        });
    }
}

module.exports.getAppartementById = (req, res) => {
    try {
        db.query(`SELECT * FROM appartements WHERE id = ${req.params.id}`, (err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving appartement.",
        });
    }
}