import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import cookie from 'js-cookie';
import '../App.css';

//Login Page
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formUsername: '',
      formEmail: '',
      formPassword: ''
    };
    this.getUser = this.getUser.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPwd = this.getPwd.bind(this);
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

  //Log In user 
  handleLogin(e) {
    e.preventDefault(); //stop page reloading before fetch has completed
    fetch('/login', { //Send 'login' form values to server to verify if login details are correct
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, // send server form values
      body: JSON.stringify({
        user: this.state.formUsername,
        email: this.state.formEmail,
        pwd: this.state.formPassword
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result === "err: Incorrect login" || result === "err: Failed to find") { //if login details are incorrect...
          alert('Incorrect login. Please try again.'); //alert user that login was unsuccessful
          window.location.reload(); //reload page to clear incorrect username/password entries
        } else { //if login details are correct...
          //Set cookie as users authorization token 
          cookie.set('token', result.token, {expires: 1});
          alert('Logged in successfully!'); //alert user that login was successful
          window.location.href = `./PhotoAlbum/${result.userID}`; //redirect page to 'My Memory Book' page, send userID as params
        }
      })
    .catch(error => console.log('Error:', error)); //if error send err msg
  }

  //Render Login Form
  render() {
    return (
      <div className="App">
        <h3 className="pageHeading">Log In</h3>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"/>
        <Form className="loginForm">
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
          <button className="loginButton" variant="primary" type="login" onClick={this.handleLogin} >
          Login
          </button>
        </Form>
        <br></br>
        <p>Don't have an account? <a href="/CreateAccount">Create an account here.</a></p>
      </div>
    );
  }
}

export default Login;