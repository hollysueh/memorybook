const express = require('express');
const router = express.Router();
const login = require('../controllers/userAuth.controller.js');

//Verify users login details 
router.post('/login', login.login);

//Export for use in ./controllers/userAuth.controller.js
module.exports = router;