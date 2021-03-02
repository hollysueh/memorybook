import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
import '../App.css';

//Import icons
import loginImg from '../image/login.png';
import createAccountImg from '../image/createAccount.png';
import userImg from '../image/user.png'


//Header - displayed on all pages
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      userID: 'no-user'
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.login = this.login.bind(this);
    this.createAcc = this.createAcc.bind(this);
  }

  //Authorise user's token - header will display user welcome msg / or link to 'log in' if no token  
  componentDidMount() {
    const token = cookie.get('token'); //Get cookie with user's token

    if (token === undefined) { //If there is no token... load header + send msg in console
      console.log("No token");
      return;
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

  //If user clicks login/create account icons
  login() {
    window.location.href = `/Login`; //redirect page to 'Login'
  }
  createAcc() {
    window.location.href = `/CreateAccount`; //redirect page to 'Create Account'
  }

  //Display App header + nav dropdown menu + welcome message / log in message
  render() {
    const { loggedIn, username, userID } = this.state;
    return (
      <Navbar expand="light" className="headerStyle">
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse>
          <Nav className="navDropdown" > 
            <Nav.Link href="/" className="dropdownLink">Home</Nav.Link><br></br>
            <Nav.Link href="/About" className="dropdownLink">About</Nav.Link><br></br>
            <Nav.Link href={`/PhotoAlbum/${userID}`} className="dropdownLink">My Memory Book</Nav.Link><br></br>
            <Nav.Link href="/FAQs" className="dropdownLink">FAQs</Nav.Link><br></br>
            <Nav.Link href="/Contact" className="dropdownLink">Contact Us</Nav.Link><br></br>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ml-auto">
        <Navbar.Text>{loggedIn ? 
          <div className="headerText">
            <p><img src={userImg} width={25} alt="userIcon" /> Welcome back {username}!</p>
          </div>
          : <div className="headerText">
            <img src={loginImg} width={25} onClick={this.login} alt="loginIcon" />{" "}
            <Link to="/Login" className="headerLink" style={{color: "rgb(116, 119, 131)"}}>Login</Link>{" "}&emsp;
            <img src={createAccountImg} width={23} onClick={this.createAcc} alt="accountIcon" />{" "}
            <Link to="/CreateAccount" className="headerLink" style={{color: "rgb(116, 119, 131)"}}>Create Account</Link>
          </div>}
        </Navbar.Text>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;