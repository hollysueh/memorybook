const express = require('express');
const auth = require('../controllers/userAuth.controller.js');
const router = express.Router();

//Authorize user token
router.post('/auth', auth.authorize);

//Export for use in ./controllers/userAuth.controller.js
module.exports = router;