import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Ride from '../Ride/Ride';
import Drive from '../Drive/Drive';
import SignIn from '../Sign_in/Sign_in';

class App extends Component {
  render() {
    return (<BrowserRouter>
      <div>
        <header>
          <Header></Header>
        </header>
        <Route exact path="/" component={Home}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/ride" component={Ride} />
        <Route path="/drive" component={Drive} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    </BrowserRouter>);
  }
}

export default App;
