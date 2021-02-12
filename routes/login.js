//Verify users login details 
module.exports = function(app) {
  const login = require('../controllers/userAuth.controller.js');
  app.post('/login', login.login);
} 

//Export for use in ./controllers/userAuth.controller.js