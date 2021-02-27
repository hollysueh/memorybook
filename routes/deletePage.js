const express = require('express');
const router = express.Router();
const page = require('../controllers/photoAlbum.controller.js');

//Delete page from photo album
router.delete('/deletePage', page.deletePage);

//Export for use in ./controllers/photoAlbum.controller.js
module.exports = router;