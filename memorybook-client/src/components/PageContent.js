import React, { Component } from 'react';
import {Image} from 'cloudinary-react';
import '../App.css';

//Page Content (displayed in 'PhotoAlbum' component)
class PageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      disabled: true,
      pageNoDisplay: this.props.pageNo + 1, //Page number that will be displayed to user
      admin: this.props.admin, //whether user has admin rights to modify album (verified by token in 'PhotoAlbum.js')
      pageID: '',
      header: '',
      photoDesc: '',
      imageID: '', //when image is loaded from server
      previewSource: '', //when image is uploaded by user from local PC
      previewImage: false //If there's no 'previewSource' image, set as false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.loadPageTxt = this.loadPageTxt.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSavePage = this.handleSavePage.bind(this);
    this.uploadPageText = this.uploadPageText.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.deletePage = this.deletePage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  //Load user's Page Content
  componentDidMount() {
    if (this.state.admin === true) { //If user is an admin, make buttons + input form editable
      this.setState({
        disabled: false
      });
    }
    if (this.props.addedPageID !== '') { //if page has been added by user in this session, addedPageID will be passed from 'PhotoAlbum'
      this.setState({
        pageID: this.props.addedPageID //set pageID as ID passed from parent
      })
    }
    this.loadPageTxt(); //call function to load page text content
  }

  //Load Page text content (header and photo description)
  loadPageTxt() {
    fetch('/getAlbum', { //Send fetch request to server to get user's page
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({ //Send userID to fetch their pages (passed from 'Photo Album')
        userID: this.props.userID
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result === "No records" || result === "Error fetching") { //If no pages are found with userID...
          console.log("Can't display pages") //send err msg
          return;
        } else { //if found pages with matching userID...
          this.setState({ 
            isLoaded: true, //load page
            pageID: result[this.props.pageNo].pageID, //get pageID (use pageNo to find correct page in result array)
            header: result[this.props.pageNo].header, //get header (use pageNo to find correct page in result array)
            photoDesc: result[this.props.pageNo].photoDesc //get photoDesc (use pageNo to find correct page in result array)
          });
        }
        this.loadImages(); //call function to load page images
      },
      (err) => { //If error with fetching photo album send err msg
        this.setState({
          isLoaded: true //load page
        });
        console.log(err);
      }
    )
  }

  //Load Page image
  loadImages() {
    fetch('/getImage', { //Send fetch request to server to get page image
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ //Send user's details and pageID to find image (passed from Photo Album)
        username: this.props.username,
        userID: this.props.userID,
        pageID: this.state.pageID
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result === "err: No records") return; //if no images found with matching details, return
        else { //if found image with matching details, load image
          this.setState({
            imageID: result
          });
        }
    })
    .catch(error => console.log('Error:', error)); //if error fetching send err msg
    }
  

  //Set states as the values entered into the form (header + photoDesc)
  handleHeaderChange(e) {
    this.setState ({
      header: e
    });
  }
  handleTextChange(e) {
    this.setState ({
      photoDesc: e
    });
  }

  //When user uploads an image from local PC, display image preview + save image data
  handleImageChange(e) { 
    const image = e.target.files[0]; //get image
    const reader = new FileReader(); 
    reader.readAsDataURL(image); //read image data
    reader.onloadend = () => {
      this.setState({
        previewSource: reader.result, //save processed image data so it can be previewed
        previewImage: true //set state as true to indicate there is an image to preview
      });
    }
  }

  //Send input form data to server, to upload to DB
  handleSavePage(e) {
    e.preventDefault(); //stop page reloading before fetch has completed
    this.uploadPageText(); //send page header + photoDesc to server
    this.uploadImage(this.state.previewSource); //send image to server
  } 

  //Upload Page Text (header + photoDesc)
  uploadPageText() {
    fetch('/updatePage', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }, // send new header, new photoDesc + user's details for upload
      body: JSON.stringify({
        username: this.props.username,
        userID: this.props.userID,
        pageID: this.state.pageID,
        header: this.state.header,
        photoDesc: this.state.photoDesc
      }),
    })
    .then(res => res.json())
    .then((result) => { //display msg in console
      console.log(result)
    })
    .catch(error => console.log('Error:', error)); //if error with fetch send err msg
    alert('Saved!'); //alert user that page was successfully saved
  }

  //Upload Page Image
  uploadImage = async (base64EncodedImage) => { 
    if (!base64EncodedImage) return; //If there is no image, return
    try {
      await fetch('/saveImage', { 
        method: "POST", //Send POST request to server
        headers: {
          "Content-Type": "application/json"
        }, // send server image data + user's details for upload
        body: JSON.stringify({
          imageData: base64EncodedImage,
          username: this.props.username,
          userID: this.props.userID,
          pageID: this.state.pageID
        }),
      })
    } catch (error) { //if error fetching send err msg
      console.error(error);
    }
  } 

  //Cancel changes made to album by reloading window
  cancelChanges() {
    window.location.reload();
  }

  // Delete Selected Page
  deletePage() {
    this.deleteImage(); //call function to delete page's image
    fetch('/deletePage', {
      method: "DELETE", //Send DELETE request to server
      headers: {
        "Content-Type": "application/json"
      }, // send server pageID + user's details for delete
      body: JSON.stringify({
        username: this.props.username,
        userID: this.props.userID,
        pageID: this.state.pageID
      }),
    })
    .then(res => res.json())
    .catch(error => console.log('Error:', error)); //if error with fetch send err msg
    alert('Deleted from records!'); //alert user that page was successfully deleted
    window.location.reload() //reload window to display updated photo album 
  }

  //Delete Image (when page deleted)
  deleteImage() {
    if (this.state.imageID === '') return; //if there is no image return
    else {
      fetch('/deleteImage', {
        method: "DELETE", //Send DELETE request to server
        headers: {
          "Content-Type": "application/json"
        }, // send server image's public_id for delete
        body: JSON.stringify({
          public_id: this.state.imageID
        }),
      })
      .then(res => res.json())
      .catch(error => console.log('Error:', error)); //if error with fetch send err msg
      console.log('Image successfully deleted'); //console.log that image was successfully deleted
    }
  }

  //Render Page Content
  render() {
    const { isLoaded, disabled, pageNoDisplay, pageID, imageID, previewImage, previewSource, header, photoDesc, fileInput } = this.state;
    if (isLoaded === false) { //if page content hasn't finished loading, display 'loading' msg
      return (
      <h5>Page loading...</h5>
      );
    } else { //if page content loaded, display page header, image, photoDesc
      return (
        <div>
          <div className="pageContent">
            <form onSubmit={this.handleSavePage}>
              <fieldset disabled={disabled}>
                <h3><input type="text" name="header" value={header} onChange={(e) => this.handleHeaderChange(e.target.value)} defaultValue="enter page header here..." className="pageTxtInput" /></h3>
                <input type="file" name="image" value={fileInput} onChange={this.handleImageChange} className="pageImgInput"/>
                {previewImage ? //If user has uploaded image from local PC, show previewed image
                  <img src={previewSource} alt="previewImg" style={{height: "300px"}} className="img" /> 
                  : //Else, show image from server
                  <Image //for loading images from Cloudinary
                    key={pageID}
                    cloudName="hollysueh"
                    publicID={imageID}
                    height="300"
                    crop="scale"
                    className="img"
                />}
                <input type="text" name="photoDesc" value={photoDesc} onChange={(e) => this.handleTextChange(e.target.value)} defaultValue="enter photo description here..." className="pageTxtInput" />
                <button className="insidePageBtn" id="savePg" type="submit">Save Page</button>
              </fieldset>
            </form>
            <br></br>
            <button disabled={disabled} className="insidePageBtn" id="cancelPg" onClick={this.cancelChanges}>Cancel Changes</button>
            <button disabled={disabled} className="insidePageBtn" id="delPg" onClick={this.deletePage}>Delete Page</button>
            <small id="pgNo">Page {pageNoDisplay}</small><br></br>
          </div>
        </div>
      );
    }
  }
}

export default PageContent;

/*
REFERENCES:
  Upload / Get images from Cloudinary: 
    https://www.youtube.com/watch?v=Rw_QeJLnCK4
  Overwrite images in Cloudinary:
    https://support.cloudinary.com/hc/en-us/articles/202520852-How-can-I-update-an-already-uploaded-image-
*/