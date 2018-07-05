import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Ride from '../Ride/Ride';
import Drive from '../Drive/Drive';

class App extends Component {
  render() {
    return (<BrowserRouter>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/ride" component={Ride} />
        <Route path="/drive" component={Drive} />
      </div>
    </BrowserRouter>);
  }
}

export default App;
