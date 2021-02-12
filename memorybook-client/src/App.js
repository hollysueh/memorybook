import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

//Import components
import Header from './components/Header';
import Landing from './components/Landing';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import About from './components/About';
import PhotoAlbum from './components/PhotoAlbum';
import FAQs from './components/FAQs';
import Contact from './components/Contact';

//Render Components
class App extends Component {
  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"/>
        <BrowserRouter>
          <Header />
          <Switch>
          <Route path="/" exact={true} component={Landing} />
          <Route path="/Login" component={Login} />
          <Route path="/CreateAccount" component={CreateAccount} />
          <Route path="/About" component={About} />
          <Route path="/PhotoAlbum/:userID" component={PhotoAlbum} />
          <Route path="/FAQs" component={FAQs} />
          <Route path="/Contact" component={Contact} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;