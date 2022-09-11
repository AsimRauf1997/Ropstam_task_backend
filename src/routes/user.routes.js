const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/user.controllers');

router.route('/').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
