import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import cookie from 'js-cookie';
import '../App.css';

//Create Account Page
class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formUsername: '',
      formEmail: '',
      formPassword: ''
    };
    this.getUser = this.getUser.bind(this);
    this.getPwd = this.getPwd.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //Change states depending on what text was entered into form
  getUser(e) {
    this.setState({
      formUsername: e
    });
  }
  getEmail(e) {
    this.setState({
      formEmail: e
    });
  }
  getPwd(e) {
    this.setState({
      formPassword: e
    });
  }

  //Send form values to server to create new user account
  handleCreateAccount(e) {
    e.preventDefault(); //stop page reloading before fetch has completed
    fetch('/newUser', { //send POST request to server
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, // send server 'create account' form values
      body: JSON.stringify({
        user: this.state.formUsername,
        email: this.state.formEmail,
        pwd: this.state.formPassword
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        if (result === "User already exists") { //if user already has an account...
          alert('Oops! You already have an account with us. Please try logging in.'); //alert user that there is an existing account
          window.location.href = "./Login"; //redirect page to 'Login' page
        } 
        else if (result === "Some error occured") { //if there was an error creating the account...
          alert('Oops! It looks like there was a problem. Please try again.'); //alert user that there was an error
        } 
        else { //if user account successfully created...
          alert('Account created!'); //alert user that account was successfully created
          this.handleLogin(); //log in new user
        }
    });
  }

  //Log In user
  handleLogin() {
    //Once new user account has been created, send "login" request to server so user is logged in
    fetch('/login', { //send POST request to server
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, // send server 'create account' form values
      body: JSON.stringify({
        user: this.state.formUsername,
        email: this.state.formEmail,
        pwd: this.state.formPassword
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result === "err: Incorrect login") { //if login details are incorrect...
          alert('Oops! An error occured. Please try again.'); //alert user that login was unsuccessful
        } else { //if login details are correct...
          //Set cookie as users authorization token 
          cookie.set('token', result.token, {expires: 1});
          window.location.href = `./PhotoAlbum/${result.userID}`; //redirect page to My Memory Book' page, send userID as params
        }
    });
  }

  //Render Create Account form
  render() {
    return (
      <div className="App">
        <h3 className="pageHeading">Create a new Account</h3>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"/>
        <Form className="accountForm">
          <Form.Group>
            <Form.Label className="formLabel">Username:</Form.Label>
            <Form.Control type="text" placeholder="username" onChange={(e) => this.getUser(e.target.value)}/>
            <br></br>
            <Form.Label className="formLabel">Email:</Form.Label>
            <Form.Control type="text" placeholder="email" onChange={(e) => this.getEmail(e.target.value)}/>
            <br></br>
            <Form.Label className="formLabel">Password:</Form.Label>
            <Form.Control type="text" placeholder="password" onChange={(e) => this.getPwd(e.target.value)}/>
            <br></br>
          </Form.Group>
          <br></br>
          <button className="accountButton" variant="primary" type="login" onClick={this.handleCreateAccount} >
          Create Account
          </button>
        </Form>
        <br></br>
        <p>Already have an account? <a href="/Login">Login here.</a></p>
      </div>
    );
  }
}

export default CreateAccount;