const express = require("express");
const {
    getSelfUser
} = require("../controller/user.controller");
const router = express.Router();
const {authenticateToken} = require('../middleware/auth.middleware');

router.get('/', authenticateToken, getSelfUser);

module.exports = router;