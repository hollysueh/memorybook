const mongoose = require('mongoose');

//Schema for new 'page' document in 'albumPages' collection
let pageSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  userID:{
    type:String,
    required:true
  },
  pageID:{
    type:String,
    required:true
  },
  header:{
    type:String,
    required:false
  },
  photoDesc:{
    type:String,
    required:false
  }
});

//Export for use in ./controllers/photoAlbum.controller.js
module.exports = mongoose.model('albumPages', pageSchema);