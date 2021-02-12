import React, { Component } from 'react';
import { BrowserRouter, withRouter } from 'react-router-dom';
import cookie from 'js-cookie';
import HTMLFlipBook from "react-pageflip";
import '../App.css';

//Import Page Content component
import PageContent from './PageContent';

//'My Memory Book' Page
class PhotoAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      newUser: false,
      numPages: 0,
      username: '',
      userID: '',
      addedPageID: '',
      admin: false,
      buttonDisable: true
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.authToken = this.authToken.bind(this);
    this.addPage = this.addPage.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.prevButtonClick = this.prevButtonClick.bind(this);
  }
  
  //Load User's Photo Album
  componentDidMount() {
    const paramsID = this.props.match.params.userID; //get userID from URL params
    fetch('/getAlbum', { //Send fetch request to server to get user's photo album
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, //Send server userID so they can fetch corresponding album pages
      body: JSON.stringify({
        userID: paramsID
      }),
    })
    .then(res => res.json())
    .then(
      (result) => { 
        if (result === "Error fetching") { //If there was an error fetching pages send err msg
          console.log("Error fetching photo album");
          return;
        } else if (result === "No records") { //if there are no pages with matching userID
          this.setState({
            newUser: true //confirm user is a 'newUser'
          })
          this.authToken(); //call function to authorise user access
        } else { //If successfully fetched pages
          const pages = result.length; //Calculate how many album pages there are
          this.setState({ 
            numPages: pages, //Set 'numPages' as number of pages fetched
            userID: paramsID //Set userID as URL params
          });
          this.authToken(); //call function to authorise user access
        }
      }
    );
  }

  //Authorise user's access
  authToken() {
    const token = cookie.get('token'); //Get cookie with user's authorization token
    if (token === undefined) { //If there is no token...
      console.log("Admin access denied"); //send err msg
      this.setState({
        isLoaded: true //load page
      });
    } else { //If there is a token, authorise token + get user's details from token
      fetch('/auth', { 
        method: "POST", //send POST request to server
        headers: {
          "Authorization": `Bearer ${token}`, //send server user's token
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(
        (result) => { 
          if (result === "err: Bad JWT!") { //If failed to authorise token...
            console.log("JWT authentication failed"); //send err msg
            this.setState({
              isLoaded: true //load page
            });
          } else { //if successfully authorised token...
            this.setState({ //Set user details decoded from token
              username: result.username,
              userID: result.userID,
              admin: true, //confirm user has access to edit album
              buttonDisable: false, //enable user to use buttons
              isLoaded: true //load page
            });
          }
        },
        (err) => { //If error with fetch authorization send err msg
          console.log(err);
        }
      )
    }
  }

  //Add new page to photo album
  addPage() {
    this.setState({
      numPages: this.state.numPages + 1, //Increase 'numPages' to +1 for new page
      newUser: false //Change user view from newUser to existing user (if wasn't already)
    });
    fetch('/addPage', { //send fetch request to server to create new photo album page
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, // send server users details to create new page
      body: JSON.stringify({
        username: this.state.username,
        userID: this.state.userID
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          addedPageID: result //get the new page's 'pageID' from server
        });
    })
    .catch(error => console.log('Error:', error)); //if error with fetch send err msg
  }

  //Flip pages when buttons clicked
  nextButtonClick = () => {
    this.flipBook.getPageFlip().flipNext("top");
  };
  prevButtonClick = () => {
    this.flipBook.getPageFlip().flipPrev("top");
  };


  //Render User's Photo Album
  render() {
    const { isLoaded, newUser, numPages, username, userID, addedPageID, admin, buttonDisable } = this.state;
    const pages = [];
    if (isLoaded === false) { //if photo album hasn't finished loading, display 'loading' msg
      return (
        <h5>Fetching your memory book...</h5>
      );
    } else { //if photo album has loaded...
      if (userID === '') { //If there is no userID in URL, display message below
        return (
          <div className="App">
            <br></br>
            <h5>Seems like you're not logged in! <a href="/Login">Login here </a>to view your memory book.</h5>
            <h6>If you don't have an account, <a href="/CreateAccount">create an account here.</a></h6>
          </div>
        );
      } else { //if photo album has loaded + there is a userID...
        if (newUser === true) { //if user is a 'newUser' with no pages in DB, display message below
          return (
            <div>
              <h5>Get started by adding a page to your memory book!</h5>
              <button onClick={this.addPage} disabled={buttonDisable}>Add Page</button>
            </div>
          );
        }
        for (let i = 0; i < numPages; i++) { //For each 'numPages', create a new page 
          pages.push(
            <div>
              <BrowserRouter>
                <PageContent key={i} pageNo={i} addedPageID={addedPageID} admin={admin} username={username} userID={userID} />
              </BrowserRouter>
            </div>
          );
        };
        return ( //Display photo album pages inside 'HTML Flip Book' with nav buttons below 
          <div className="App">
            <h1 className="pageHeading">{username}'s Memory Book</h1>
            <div className="flipBook">
              <HTMLFlipBook 
                width={500}
                height={500}
                size="stretch"
                drawShadow={true}
                useMouseEvents={false} //disable page turn on click (so input form can be used)
                clickEventForward={true} //enable mouse clicks from PageContent component
                ref={(el) => (this.flipBook = el)} //Allow pages to be turned via "Prev"/"Next" buttons
              >
                {pages}
              </HTMLFlipBook>
            </div>
            <button className="pageNavBtn" id="pagePrev" onClick={this.prevButtonClick}>Previous page</button>
            <button className="pageNavBtn"  id="pageNext" onClick={this.nextButtonClick}>Next page</button>
            <button className="pageNavBtn" id="pageAddBtn" onClick={this.addPage} disabled={buttonDisable}>Add Page</button>
          </div>
        );
      }
    }
  }
}

export default withRouter(PhotoAlbum); //export withRouter so can retrieve URL params

/*
REFERENCES:
  HTML FlipBook: 
    https://nodlik.github.io/StPageFlip/
  Add page to photo album:
    https://stackoverflow.com/questions/35905988/react-js-how-to-append-a-component-on-click
  Use withRouter to access URL params:
    https://stackoverflow.com/questions/60316049/url-parameter-in-react-class-component
*/