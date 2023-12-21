const express = require("express");
const {
    getAllUser,
    getUserById,
    getSelfUser,
} = require("../controller/user.controller");
const router = express.Router();
const {authenticateToken} = require('../middleware/auth.middleware');

router.get('/', authenticateToken, getAllUser);
router.get('/:id',  authenticateToken, getUserById);

module.exports = router;