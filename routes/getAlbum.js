//Find all users photo album 'pages' (documents)
module.exports = function(app) {
  const album = require('../controllers/photoAlbum.controller.js');
  app.post('/getAlbum', album.getAlbum);
}

//Export for use in ./controllers/photoAlbum.controller.js