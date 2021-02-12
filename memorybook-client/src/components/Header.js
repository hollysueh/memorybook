import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
import logo from '../image/memorybook_logo.png';
import '../App.css';

//Import Dropdown Menu component
import DropdownMenu from './DropdownMenu';

//Header - displayed on all pages
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      loggedIn: false,
      username: '',
      userID: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  //Authorise user's token - header will display user welcome msg / or link to 'log in' if no token  
  componentDidMount() {
    const token = cookie.get('token'); //Get cookie with user's token

    if (token === undefined) { //If there is no token... load header + send msg in console
      this.setState({
        isLoaded: true 
      });
      console.log("Unable to read token");
    } else { //If there is a token...
      //Authorise token and fetch users details
      fetch('/auth', { 
        method: "POST", //send POST request to server
        headers: {
          "Authorization": `Bearer ${token}`, //send server users token
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(
        (result) => { 
          if (result === "err: Bad JWT!") { //If authorise failed send err msg
            console.log("JWT authentication failed");
          } else { //If token authorised...
            this.setState({ //Set user details + confirm user loggedIn
              isLoaded: true, 
              loggedIn: true, 
              username: result.username,
              userID: result.userID
            });
          }
        },
        (err) => { //If error with fetch authorization send err msg
          console.log("ERROR: " + err);
        }
      )
    }
  }

  //If user clicks app logo
  goHome() {
    window.location.href = `/`; //redirect page to 'Home'
  }

  //Display App header + nav dropdown menu + welcome message / log in message
  render() {
    const { loggedIn, isLoaded, username, userID } = this.state;
    if (isLoaded === false) { //If componentDidMount hasn't completed yet, display "Loading..."
      return (
        <div>
          <small>Loading...</small>
        </div>
      );
    } else { //If loaded, display header + user's name (if logged in) or link to log in (if not logged in)
      return (
        <div className="headerStyle">
          <header>
            <div id="headerNav">
              <DropdownMenu userID={userID} />
            </div>
            <div id="headerImg">
              <img src={logo} alt="logo" width={250} onClick={this.goHome}/>
            </div>
            <div id="headerGreet">
              <h4>{loggedIn ? `Welcome back ${username}!` :
                <div>
                  <Link to="/Login" className="headerLink">Login /</Link>
                  <Link to="/CreateAccount" className="headerLink"> Create Account</Link>
                </div>}
              </h4>
            </div>
          </header>
        </div>
      );
    }
  }
}

export default Header;