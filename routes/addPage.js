//Add new page to photo album
module.exports = function(app) {
  const page = require('../controllers/photoAlbum.controller.js');
  app.post('/addPage', page.addPage);
} 

//Export for use in ./controllers/photoAlbum.controller.js