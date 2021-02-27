const express = require('express');
const router = express.Router();
const newUser = require('../controllers/userAuth.controller.js');

//Create new user account
router.post('/newUser', newUser.createUser);

//Export for use in ./controllers/userAuth.controller.js
module.exports = router;