const express = require("express");
const router = express.Router();
const db = require("../config/db");


module.exports.getAllUser = (req, res) => {
    try {
        db.query("SELECT * FROM user", (err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        });
    } catch (err) {
        db.errorHandler(res, err);
    }
}