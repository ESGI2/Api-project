const express = require("express");
const router = express.Router();
const signinController = require("../controller/signin.controller");

// Utilisez la fonction correcte du contrôleur
router.post('/', signinController.postSignIn);

module.exports = router;
