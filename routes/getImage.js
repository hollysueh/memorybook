//Get image from Cloudinary
module.exports = function(app) {
  const image = require('../controllers/image.controller.js');
  app.post('/getImage', image.getImage);
} 

//Export for use in ./controllers/image.controller.js