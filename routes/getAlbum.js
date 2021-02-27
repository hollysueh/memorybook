const express = require('express');
const router = express.Router();
const album = require('../controllers/photoAlbum.controller.js');

//Find all users photo album 'pages' (documents)
router.post('/getAlbum', album.getAlbum);

//Export for use in ./controllers/photoAlbum.controller.js
module.exports = router;