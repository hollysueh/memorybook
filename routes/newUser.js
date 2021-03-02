//Create new user account
module.exports = function(app) {
  const newUser = require('../controllers/userAuth.controller.js');
  app.post('/newUser', newUser.createUser);
} 

//Export for use in ./controllers/userAuth.controller.js