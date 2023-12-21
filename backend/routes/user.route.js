const express = require("express");
const {
    getAllUser,
    getUserById,
    deleteUser
} = require("../controller/user.controller");
const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getUserById);

module.exports = router;