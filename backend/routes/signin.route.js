const express = require('express');
const router = express.Router();
const signinController = require('../controller/signin.controller');

router.post('/', signinController.postSignIn);

module.exports = router;
