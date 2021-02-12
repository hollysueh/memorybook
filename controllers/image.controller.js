const express = require('express');
const app = require('../app.js');
const cloudinary = require('cloudinary').v2


//Get Image from Cloudinary
//Export from ./routes/getImage.js
exports.getImage = function(req, res) {
  try {
    cloudinary.search.expression( //search for image in Cloudinary
      `folder:memory_book AND 
      context.username=${req.body.username} AND 
      context.userID=${req.body.userID} AND 
      context.pageID=${req.body.pageID}`) 
    .execute()
    .then (result => {
      if (result.total_count === 0) { //If no records found send error msg
        res.send("err: No records");
      } else { //If found matching record...
      const image = result.resources[0].public_id; //get image public_id
      res.json(image); //return image public_id (so image can be displayed in client)
      }
    }); 
  } catch (error) { //If error searching Cloudinary return error msg
    res.send(error);
  }
}

//Upload Image to Cloudinary
//Export from ./routes/saveImage.js
exports.uploadImage = function(req, res) {
  const fileStr = req.body.imageData; //get new image data from client

  cloudinary.search.expression( //search for image in Cloudinary
      `folder:memory_book AND 
      context.username=${req.body.username} AND 
      context.userID=${req.body.userID} AND 
      context.pageID=${req.body.pageID}`) 
    .execute()
    .then (result => {
      if (result.total_count === 0) { //if there are no existing images for that user/pageID...
        try {
          //Upload image to Cloudinary with user details
          const uploadedResponse = cloudinary.uploader.upload(fileStr, {
            upload_preset: 'memory_book', //upload in cloudinary folder 'memory_book'
            context: `username=${req.body.username}| 
            userID=${req.body.userID}|
            pageID=${req.body.pageID}`, //context metadata
            invalidate: true //invalidate old assets on CDN server cache
          })
          console.log(uploadedResponse);
          res.json("Successfully uploaded") //send msg if image uploaded
        } catch (err) {
          res.status(500).json("err: Unable to upload" + err) //send err msg if error uploading image
        }
      } else { //if there is an existing image with the same user/pageID...
        try { 
          //Overwrite existing image with new image
          const uploadedResponse = cloudinary.uploader.upload(fileStr, {
            public_id: result.resources[0].public_id, //replace existing image by assigning new image the same public_id
            context: `username=${req.body.username}| 
            userID=${req.body.userID}|
            pageID=${req.body.pageID}`, //context metadata
            invalidate: true //invalidate old assets on CDN server cache
          })
          console.log(uploadedResponse);
          res.json({message: "Successfully uploaded"}) //send msg if image uploaded
        } catch (err) {
          res.status(500).json("err: Unable to upload" + err) //send err msg if error uploading image
        }
      }
  }); 
}

//Delete Image from Cloudinary
//Export from ./routes/deleteImage.js
exports.deleteImage = function(req, res) {
  cloudinary.uploader.destroy(`${req.body.public_id}`, { //search Cloudinary for image with matching public_id, then delete
    type: "upload",
    invalidate: true //invalidate old assets on CDN server cache
  }, function(res, err) { 
    if (err) { //if error send err msg
      console.log(err);
    } else { //send msg if file has been deleted
      console.log(res); 
    }
  })
}

/*
REFERENCES:
  Upload / Get images from Cloudinary: 
    https://www.youtube.com/watch?v=Rw_QeJLnCK4
  Overwrite images in Cloudinary:
    https://support.cloudinary.com/hc/en-us/articles/202520852-How-can-I-update-an-already-uploaded-image-
*/