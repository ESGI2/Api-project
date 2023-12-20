const express = require("express");
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controller/user.controller");
const router = express.Router();

router.get('/', getAllUser);
// router.get('/:id', getUserById);
// router.post('/', createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

module.exports = router;