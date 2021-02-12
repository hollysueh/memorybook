import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import '../App.css';

//Contact Page
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formName: '',
      formEmail: '',
      formQuery: ''
    };
    this.getName = this.getName.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Change states depending on what text was entered into form
  getName(e) {
    this.setState({
      formName: e
    });
  }
  getEmail(e) {
    this.setState({
      formEmail: e
    });
  }
  getQuery(e) {
    this.setState({
      formQuery: e
    });
  }

  //On contact form submit
  handleSubmit() {
    alert("Thank you for your query! We'll be in touch soon.") //alert user successfully submitted
  }

  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"/>
        <h1 className="pageHeading">Contact Us</h1>
        <p>Send us a query using the form below!</p>
        <Form className="contactForm">
          <Form.Group>
          <Form.Label className="formLabel">Name:</Form.Label>
            <Form.Control type="text" placeholder="type your name here..." onChange={(e) => this.getName(e.target.value)}/>
            <br></br>
            <Form.Label className="formLabel">Email:</Form.Label>
            <Form.Control type="text" placeholder="type your email here..." onChange={(e) => this.getEmail(e.target.value)}/>
            <br></br>
            <Form.Label className="formLabel">Your Query:</Form.Label>
            <Form.Control type="text" placeholder="type your query here..." onChange={(e) => this.getQuery(e.target.value)}/>
            <br></br>
          </Form.Group>
          <br></br>
          <button className="contactButton" variant="primary" type="login" onClick={this.handleSubmit} >
          Submit
          </button>
        </Form>
      </div>
    );
  }
}

export default Contact;