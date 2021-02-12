const mongoose = require('mongoose');

//Schema for new 'user' document in 'userAccounts' collection
let userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  userID:{
    type:String,
    required:true,
  },
  admin:{
    type:Boolean,
    required:true
  }
});

//Export for use in ./controllers/userAuth.controller.js
module.exports = mongoose.model('userAccounts', userSchema);